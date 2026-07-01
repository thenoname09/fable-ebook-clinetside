"use client";

import { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  TextArea,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  Button,

} from "@heroui/react";
import {
  FiChevronDown,
  FiUploadCloud,
  FiCheck,
  FiTrash2,
  FiAlertTriangle,
  FiBookOpen,
  FiLock,
  FiInfo,
  FiBookmark,
} from "react-icons/fi";
import Image from "next/image";
import { addEbook } from "@/lib/writer/action";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// ── Shared Tailwind Design Tokens ─────────────────────────────────────────────
const inputCls =
  "w-full bg-zinc-900/40 border border-zinc-800 text-white text-sm rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition-colors";

const labelCls = "text-sm font-medium text-zinc-200";
const errorCls = "text-xs text-red-400 mt-1.5 flex items-center gap-1";

const triggerCls =
  "w-full bg-zinc-900/40 border border-zinc-800 text-sm rounded-lg px-3 py-2.5 flex items-center justify-between cursor-pointer outline-none hover:border-zinc-700 transition-colors";

const popoverCls =
  "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl z-50";

const listItemCls =
  "text-zinc-300 text-sm px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-800 hover:text-white outline-none data-[focused=true]:bg-zinc-800";

const genres = [
  { id: "fantasy", label: "Fantasy" },
  { id: "science-fiction", label: "Science Fiction" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "thriller", label: "Thriller" },
  { id: "horror", label: "Horror" },
  { id: "biography", label: "Biography" },
  { id: "self-help", label: "Self Help" },
  { id: "technology", label: "Technology" },
];

export default function AddEbookPage() {

  const [errors, setErrors] = useState({});
  const [coverUrl, setCoverUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");
  const [form, setForm] = useState({
    title: "",
    genre: "",
    price: "",
    description: "",
    fullDescription: "",
  });

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, cover: "Max 5 MB allowed." }));
      return;
    }
    setCoverPreview(URL.createObjectURL(file));
    setIsUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: fd },
      );
      const data = await res.json();
      if (data.success) {
        setCoverUrl(data.data.url);
        setErrors((p) => ({ ...p, cover: "" }));
      } else {
        setErrors((p) => ({ ...p, cover: "Upload failed." }));
      }
    } catch {
      setErrors((p) => ({ ...p, cover: "Network error." }));
    } finally {
      setIsUploading(false);
    }
  };

const { data: session,  } = authClient.useSession();

  const user = session?.user;


const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Validation
  const errs = {};
  if (!form.title.trim())           errs.title           = "Title is required.";
  if (!form.genre)                  errs.genre           = "Select a genre.";
  if (!form.price || Number(form.price) <= 0) errs.price = "Enter a valid price.";
  if (!form.description.trim())     errs.description     = "Description is required.";
  if (!form.fullDescription.trim()) errs.fullDescription = "Full description is required.";
  if (!coverUrl)                    errs.cover           = "Cover image is required.";
  if (Object.keys(errs).length) { setErrors(errs); return; }


  const payload = {
    title:  form.title.trim(),
    genre: form.genre,
    price:  Number(form.price),
    description: form.description.trim(),
    fullDescription: form.fullDescription.trim(),
    coverImage: coverUrl,
    status: "unpublished",

    writerId: user?._id ?? user?.id,
    writerName: user?.name,
    writerEmail: user?.email,

    createdAt: new Date(),
  };

  // 3. Call server action
  try {
    const res = await addEbook(payload);

    if (res?.insertedId || res?.success) {
   
      toast.success("Your Book successfully added!");
      // reset form
      setForm({ title: "", genre: "", price: "", description: "", fullDescription: "" });
      setCoverUrl("");
      setCoverPreview("");
      setErrors({});
    } else {
       toast.error("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("addEbook error:", err);
    
  }
};

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Outer Card Container Panel */}
      <div className="bg-[#0b0c0e]/40 border border-zinc-900 rounded-2xl p-6 md:p-10 w-full">
        {/* Header Section Matrix Component */}
        <div className="flex items-start gap-4 pb-8 mb-8 border-b border-zinc-900/60">
          <div className="bg-purple-950/40 border border-purple-500/10 p-3.5 rounded-xl text-purple-400 shrink-0">
            <FiBookOpen size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Add New Ebook
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Create a new ebook and manage its details before publishing.
            </p>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="space-y-8"
          validationErrors={errors}
          validationBehavior="aria"
        >
          <Fieldset
            className="space-y-8 w-full p-0 m-0 border-0"
            disabled={isUploading}
          >
            {/* ── ROW 1: Title | Genre ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0">
              {/* Title Input */}
              <TextField
                name="title"
                isInvalid={!!errors.title}
                className="min-w-0 flex flex-col gap-1.5"
              >
                <Label className={labelCls}>
                  Title <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. The Lost Meridian"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls}
                />
                {errors.title && (
                  <FieldError className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.title}
                  </FieldError>
                )}
              </TextField>

              {/* Genre Selector */}
              <div className="min-w-0 flex flex-col gap-1.5">
                <Select
                  value={form.genre || null}
                  onChange={(key) => set("genre", String(key))}
                >
                  <Label className={labelCls}>Genre</Label>
                  <Select.Trigger className={triggerCls}>
                    <Select.Value placeholder="Select a genre" />
                    <Select.Indicator>
                      <FiChevronDown size={15} className="text-zinc-500" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className={popoverCls}>
                    <ListBox className="outline-none">
                      {genres.map(({ id, label }) => (
                        <ListBox.Item
                          key={id}
                          id={id}
                          textValue={label}
                          className={listItemCls}
                        >
                          {label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.genre && (
                  <p className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.genre}
                  </p>
                )}
              </div>
            </div>

            {/* ── ROW 2: Price | Cover Image Dropzone ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0 items-start">
              {/* Price Field with inner Right Side '$' Character Element */}
              <TextField
                name="price"
                isInvalid={!!errors.price}
                className="min-w-0 flex flex-col gap-1.5"
              >
                <Label className={labelCls}>
                  Price (USD) <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <div className="relative flex items-center w-full">
                  <Input
                    type="number"
                    placeholder="9.99"
                    min={0}
                    step="0.01"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    className={`${inputCls} pr-10`}
                  />
                  <span className="absolute right-4 text-zinc-500 text-sm font-medium select-none pointer-events-none">
                    $
                  </span>
                </div>
                {errors.price && (
                  <FieldError className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.price}
                  </FieldError>
                )}
              </TextField>

              {/* Tall Unified Cover Image Target Block Box */}
              <div className="min-w-0 flex flex-col gap-1.5 h-full">
                <Label className={labelCls}>
                  Cover Image <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <div className="w-full min-h-[175px] bg-zinc-900/20 border border-dashed border-zinc-800/80 rounded-xl relative overflow-hidden transition-colors hover:border-zinc-700/80">
                  {coverPreview ? (
                    <div className="absolute inset-0 w-full h-full group bg-zinc-950 flex items-center justify-center p-3">
                      <Image
                        src={coverPreview}
                        alt="cover preview"
                        width={120}
                        height={150}
                        className="h-full w-auto object-contain rounded"
                      />
                      <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2.5 transition-opacity">
                        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <FiCheck size={13} /> Uploaded Asset
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setCoverPreview("");
                            setCoverUrl("");
                          }}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-red-500/20"
                        >
                          <FiTrash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center w-full h-full cursor-pointer select-none group px-4 py-6">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3.5 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                        <FiUploadCloud size={22} />
                      </div>
                      <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                        {isUploading ? "Uploading asset..." : "Upload image"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1.5">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  )}
                </div>
                {errors.cover && (
                  <p className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.cover}
                  </p>
                )}
              </div>
            </div>

            {/* ── ROW 3: Description Panel with Counter ── */}
            <div className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <Label className={labelCls}>
                  Description <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <span className="text-xs text-zinc-600 font-medium select-none">
                  {form.description.length} / 500
                </span>
              </div>
              <TextField
                name="description"
                isInvalid={!!errors.description}
                className="w-full"
              >
                <TextArea
                  placeholder="Write a compelling summary shown to readers before purchase..."
                  value={form.description}
                  onChange={(e) =>
                    set("description", e.target.value.slice(0, 500))
                  }
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
                {errors.description && (
                  <FieldError className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.description}
                  </FieldError>
                )}
              </TextField>
            </div>

            {/* ── ROW 4: Full Description Panel with Counter & Lock Warning ── */}
            <div className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <Label className={labelCls}>
                  Full Description{" "}
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <span className="text-xs text-zinc-600 font-medium select-none">
                  {form.fullDescription.length} / 5000
                </span>
              </div>
              <TextField
                name="fullDescription"
                isInvalid={!!errors.fullDescription}
                className="w-full"
              >
                <TextArea
                  placeholder="Write the complete ebook content. Only visible to readers after purchase..."
                  value={form.fullDescription}
                  onChange={(e) =>
                    set("fullDescription", e.target.value.slice(0, 5000))
                  }
                  rows={7}
                  className={`${inputCls} resize-y`}
                />
                <p className="text-xs text-zinc-500 mt-2 flex items-center gap-2 select-none">
                  <FiLock size={13} className="text-zinc-600 shrink-0" /> Only
                  visible to readers after purchase.
                </p>
                {errors.fullDescription && (
                  <FieldError className={errorCls}>
                    <FiAlertTriangle size={11} />
                    {errors.fullDescription}
                  </FieldError>
                )}
              </TextField>
            </div>

            {/* Amber Status Notice Banner Panel Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.015]">
              <FiInfo size={16} className="text-amber-500/80 mt-0.5 shrink-0" />
              <p className="text-xs text-zinc-400 leading-relaxed select-none">
                This ebook will be saved as{" "}
                <span className="text-amber-500/90 font-semibold">
                  unpublished
                </span>
                . You can change its visibility and publish settings later from
                the management panel.
              </p>
            </div>

            {/* Responsive Action Buttons Row Elements */}
            <div className="flex justify-end gap-3 pt-6 border-t border-zinc-900/80">
              <Button
                type="button"
                variant="bordered"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/60 rounded-lg px-5 font-medium h-10 text-sm cursor-pointer transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 text-white font-medium hover:bg-purple-500 rounded-lg px-5 h-10 text-sm cursor-pointer flex items-center gap-2 transition-all shadow-lg shadow-purple-600/10"
              >
                <FiBookmark size={15} className="shrink-0" />
                Save Ebook
              </Button>
            </div>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
}
