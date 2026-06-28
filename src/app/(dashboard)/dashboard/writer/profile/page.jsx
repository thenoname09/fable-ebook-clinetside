"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import {
  FiEdit2,
  FiBookOpen,
  FiHeart,
  FiUser,
  FiMail,
  FiCalendar,
  FiMoreVertical,
  FiEye,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

// ── mock data (replace with real API calls) ───────────────────────────────────
const STATS = [
  {
    label: "Books Published",
    sub: "Total Books",
    value: "12",
    icon: FiBookOpen,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Total Reads",
    sub: "All Time",
    value: "45.3K",
    icon: FiEye,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    label: "Followers",
    sub: "Total Followers",
    value: "2.4K",
    icon: FiUsers,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Earnings",
    sub: "All Time",
    value: "$1,250",
    icon: FiDollarSign,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const RECENT_EBOOKS = [
  {
    id: 1,
    title: "The Lost Kingdom",
    genre: "Fantasy",
    reads: "2.4K",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
  },
  {
    id: 2,
    title: "Shadow of the Past",
    genre: "Adventure",
    reads: "1.8K",
    cover:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=280&fit=crop",
  },
  {
    id: 3,
    title: "Echoes of Eternity",
    genre: "Fantasy",
    reads: "3.1K",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
  },
  {
    id: 4,
    title: "Beyond the Horizon",
    genre: "Sci-Fi",
    reads: "1.2K",
    cover:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&h=280&fit=crop",
  },
];

const GENRE_COLORS = {
  Fantasy: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Adventure: "bg-sky-500/15    text-sky-400    border-sky-500/20",
  "Sci-Fi": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Mystery: "bg-amber-500/15  text-amber-400   border-amber-500/20",
  Romance: "bg-pink-500/15   text-pink-400    border-pink-500/20",
};

const TABS = ["Overview", "Books", "Bookmarks"];

export default function WriterProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [bio, setBio] = useState(
    "I love writing stories that transport readers to new worlds and inspire them.\n\nFantasy and adventure are my strong suits. When I'm not writing, I'm probably reading or exploring new ideas.",
  );
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(bio);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const saveBio = () => {
    setBio(bioInput.trim());
    setEditingBio(false);
  };

  const getInitials = (name) => {
    if (!name) return "W";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 pb-10">
      {/* ── Profile Header Card ──────────────────────────────── */}
      <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
        {/* Banner gradient */}
        <div className="h-28 w-full bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-zinc-900/20" />

        {/* Top-right action */}
        <div className="absolute top-4 right-4">
          <button className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <FiEdit2 size={14} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl border-4 border-[#080808] bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center overflow-hidden shadow-xl">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-purple-300">
                      {getInitials(user?.name)}
                    </span>
                  )}
                </div>
                {/* online dot */}
                <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080808]" />
              </div>

              {/* Name + badge */}
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">
                    {user?.name ?? "Writer"}
                  </h1>
                  <FiCheckCircle size={16} className="text-purple-400" />
                </div>
                <Chip
                  size="sm"
                  variant="flat"
                  className="bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs mt-1 capitalize"
                >
                  <FiUser size={10} className="mr-1" /> {user?.role ?? "reader"}
                </Chip>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:mb-1">
              <Button
                size="sm"
                variant="bordered"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg text-xs h-9 gap-1.5"
              >
                <FiBookOpen size={13} /> My Ebooks
              </Button>
              <Button
                size="sm"
                variant="bordered"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg text-xs h-9 gap-1.5"
              >
                <FiHeart size={13} /> Bookmarks
              </Button>
              <Link href="/dashboard/writer/profile">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white rounded-lg text-xs h-9 gap-1.5 border-0 hover:opacity-90"
                >
                  <FiEdit2 size={13} /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {user?.email && (
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <FiMail size={12} /> {user.email}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <FiCalendar size={12} />
              Member since{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, sub, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center gap-4"
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-xl ${bg} ${color} shrink-0`}
            >
              <Icon size={18} />
            </span>
            <div>
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="text-xl font-bold text-white leading-tight">
                {value}
              </p>
              <p className="text-[10px] text-zinc-600">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 border-b border-zinc-800/60">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c084fc] to-[#818cf8] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ──────────────────────────────────────── */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* About Me */}
          <div className="md:col-span-1 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FiUser size={14} className="text-purple-400" /> About Me
              </h3>
            </div>

            {editingBio ? (
              <div className="space-y-2">
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={6}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-lg p-3 outline-none focus:border-purple-500/50 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveBio}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white text-xs font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingBio(false);
                      setBioInput(bio);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                  {bio}
                </p>
                <button
                  onClick={() => setEditingBio(true)}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-purple-400 transition-colors mt-1"
                >
                  <FiEdit2 size={11} /> Edit Bio
                </button>
              </>
            )}
          </div>

          {/* Recently Published */}
          <div className="md:col-span-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FiBookOpen size={14} className="text-purple-400" /> Recently
                Published
              </h3>
              <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RECENT_EBOOKS.map((book) => (
                <div key={book.id} className="group relative">
                  {/* Cover */}
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-900">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {/* more btn */}
                    <button className="absolute top-2 right-2 p-1 rounded-md bg-black/40 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiMoreVertical size={13} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-semibold text-white leading-tight truncate">
                      {book.title}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${GENRE_COLORS[book.genre] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
                    >
                      {book.genre}
                    </span>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <FiEye size={9} /> {book.reads} reads
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Books" && (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6">
          <p className="text-sm text-zinc-500 text-center py-8">
            Books tab — connect to your ebooks API here.
          </p>
        </div>
      )}

      {activeTab === "Bookmarks" && (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6">
          <p className="text-sm text-zinc-500 text-center py-8">
            Bookmarks tab — connect to your bookmarks API here.
          </p>
        </div>
      )}
    </div>
  );
}
