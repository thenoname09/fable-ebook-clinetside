"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import {
  FiUploadCloud,
  FiUser,
  FiCheck,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import Image from "next/image";

// ── shared styles ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-zinc-900/40 border border-zinc-800 text-white text-sm rounded-xl px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition-colors";
const labelCls = "block text-sm font-medium text-zinc-300 mb-1.5";

export default function UserUpdate({ session }) {
  const user = session?.user;

  const [name, setName]     = useState(user?.name || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [imagePreview, setImagePreview] = useState(user?.image || "");



  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving]       = useState(false);
  const [status, setStatus]           = useState({ type: "", text: "" });

  // Sync session into state
 

  // Upload avatar to imgBB
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", text: "Image must be under 5 MB." });
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);
    setStatus({ type: "", text: "" });

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res  = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: fd }
      );
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        setStatus({ type: "success", text: "Image uploaded successfully!" });
      } else {
        setStatus({ type: "error", text: "Upload failed. Try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Network error during upload." });
    } finally {
      setIsUploading(false);
    }
  };

  // Save profile via Better Auth
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus({ type: "error", text: "Name cannot be empty." });
      return;
    }

    setIsSaving(true);
    setStatus({ type: "", text: "" });

    const { error } = await authClient.updateUser({
      name:  name.trim(),
      image: imageUrl,
    });

    if (error) {
      setStatus({ type: "error", text: error.message || "Failed to update profile." });
    } else {
      setStatus({ type: "success", text: "Profile updated successfully!" });
    }

    setIsSaving(false);
  };

  // Loading state
  // if (isSessionLoading) {
  //   return (
  //     <div className="flex h-64 items-center justify-center text-zinc-400 gap-2">
  //       <FiLoader className="animate-spin" size={18} /> Loading...
  //     </div>
  //   );
  // }

  const isDisabled = isSaving || isUploading;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="bg-[#0c0d10] border border-zinc-900 rounded-2xl p-6 md:p-8">

        {/* Header */}
        <div className="mb-7 pb-5 border-b border-zinc-900">
          <h1 className="text-xl font-bold text-white">Profile Settings</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Update your display name and avatar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center group">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <FiUser size={34} className="text-zinc-600" />
              )}

              {/* hover overlay */}
              <label className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <FiUploadCloud size={16} className="text-white" />
                <span className="text-[10px] text-zinc-300 font-medium">Change</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isDisabled}
                />
              </label>
            </div>

            {isUploading && (
              <p className="text-xs text-purple-400 flex items-center gap-1.5">
                <FiLoader className="animate-spin" size={11} /> Uploading...
              </p>
            )}
            <p className="text-[11px] text-zinc-600">
              Click avatar to upload · Max 2 MB
            </p>
          </div>

          {/* Name */}
          <div>
            <label className={labelCls}>Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isDisabled}
              className={inputCls}
            />
          </div>

          {/* Email — read only */}
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className={`${inputCls} opacity-40 cursor-not-allowed`}
            />
            <p className="text-[11px] text-zinc-600 mt-1">
              Email cannot be changed.
            </p>
          </div>

          {/* Status message */}
          {status.text && (
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-medium ${
              status.type === "success"
                ? "bg-emerald-500/5 border-emerald-500/15 text-emerald-400"
                : "bg-red-500/5 border-red-500/15 text-red-400"
            }`}>
              {status.type === "success"
                ? <FiCheck size={13} />
                : <FiAlertTriangle size={13} />
              }
              {status.text}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white font-semibold rounded-xl px-6 h-10 text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}