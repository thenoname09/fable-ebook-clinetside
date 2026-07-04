
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBookmark,
  FiShare2,
  FiStar,
  FiCheckCircle,
  FiShield,
  FiZap,
  FiShoppingBag,
} from "react-icons/fi";
import BookDetailsBtn from "./BookDetailsBtn";

const GENRE_STYLES = {
  "science-fiction": "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  fantasy: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  mystery: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  romance: "bg-pink-500/15 text-pink-400 border border-pink-500/20",
  horror: "bg-red-500/15 text-red-400 border border-red-500/20",
  thriller: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  biography: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  "self-help": "bg-teal-500/15 text-teal-400 border border-teal-500/20",
  technology: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
};

export default function BookDetailsPage({ book }) {
  const genreStyle =
    GENRE_STYLES[book.genre] ?? "bg-zinc-800 text-zinc-400 border-zinc-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      {/* Header Navigation */}
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <FiArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Browse</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <FiShare2 size={18} className="text-zinc-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative group aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800/50">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <FiBookmark size={64} className="text-zinc-700" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Book Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {book.status}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {book.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-base">by</span>
                <span className="text-lg font-semibold text-purple-400 hover:text-purple-300 cursor-pointer">
                  {book.writerName}
                </span>
                <FiCheckCircle size={16} className="text-purple-400" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-700"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white ml-2">
                  4.8
                </span>
              </div>
              <span className="text-xs text-zinc-500">(124 reviews)</span>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2">
              {/* Dynamic Main Genre Pill from DB */}
              {book?.genre && (
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border capitalize ${genreStyle}`}
                >
                  {book.genre}
                </span>
              )}

              {/* Other Hardcoded/Secondary Genre Pills */}
              {["Adventure", "Classic"].map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border capitalize ${genreStyle}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="pt-4">
              <div className="text-4xl font-bold text-white">
                ${Number(book.price).toFixed(2)}
              </div>
              <p className="text-xs text-zinc-500 mt-1">One-time purchase</p>
            </div>

            {/* Action Buttons */}
            <BookDetailsBtn book={book}></BookDetailsBtn>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <FiShield size={14} />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <FiZap size={14} />
                <span>Instant access</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="pt-8 border-t border-zinc-800/50 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiBookmark size={18} />
                About This Book
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {book.description}
              </p>
              <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors">
                <span>Show full description</span>
                <span>›</span>
              </button>
            </div>

            {/* Book Info Grid */}
            <div className="pt-8 border-t border-zinc-800/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Published</p>
                <p className="text-sm font-semibold text-white">
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Genre</p>
                <p className="text-sm font-semibold text-white capitalize">
                  {book.genre}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Language</p>
                <p className="text-sm font-semibold text-white">English</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Format</p>
                <p className="text-sm font-semibold text-white">Ebook</p>
              </div>
            </div>
            {/* Author Info Section */}
            <div className="pt-8 border-t border-zinc-800/50 space-y-4">
              <h2 className="text-lg font-bold text-white">About the Author</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                  {book.writerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    {book.writerName}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-3">Verified</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {book.writerName} is a passionate writer who loves crafting
                    engaging stories that inspire and entertain readers.
                  </p>
                  <button className="mt-3 flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 rounded-lg px-3 py-1.5 hover:bg-purple-500/10">
                    <span>View Profile</span>
                    <span>›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
