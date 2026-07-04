
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiBookOpen } from "react-icons/fi";

// ── genre color map ───────────────────────────────────────────────────────────
const GENRE_STYLES = {
  "science-fiction": "bg-sky-500/15     text-sky-400     border-sky-500/20",
  fantasy:           "bg-purple-500/15  text-purple-400  border-purple-500/20",
  mystery:           "bg-amber-500/15   text-amber-400   border-amber-500/20",
  romance:           "bg-pink-500/15    text-pink-400    border-pink-500/20",
  horror:            "bg-red-500/15     text-red-400     border-red-500/20",
  thriller:          "bg-orange-500/15  text-orange-400  border-orange-500/20",
  biography:         "bg-blue-500/15    text-blue-400    border-blue-500/20",
  "self-help":       "bg-teal-500/15    text-teal-400    border-teal-500/20",
  technology:        "bg-cyan-500/15    text-cyan-400    border-cyan-500/20",
};

const STATUS_STYLES = {
  published:   "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  unpublished: "bg-zinc-800       text-zinc-400    border-zinc-700",
};


export default function BookCard({ book }) {
  const {
    _id,
    title,
    writerName,
    description,
    genre,
    price,
    coverImage,
    status,
  } = book;

  console.log(coverImage)
  const genreStyle  = GENRE_STYLES[genre]  ?? "bg-zinc-800 text-zinc-400 border-zinc-700";
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.unpublished;

  return (
    <div className="group flex flex-col bg-[#0f0f0f] border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">

      {/* ── Cover image (Larger & More Prominent) */}
      <Link href={`/browse/${_id}`}>
<div className="relative w-full aspect-[3/3.5]  overflow-hidden bg-zinc-900 shrink-0">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
          fill
       
            className=" w-full object-contain  bg-zinc-900 group-hover:scale-105 transition-transform duration-500"
            
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            <FiBookOpen size={36} className="text-zinc-700" />
          </div>
        )}

        {/* Genre badge — top left */}
        {/* <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize backdrop-blur-sm ${genreStyle}`}>
          {genre}
        </span> */}
      </div>
</Link>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title - Clickable */}
<Link href={`/browse/${_id}`}>
  <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 group-hover:text-purple-300 hover:underline transition-colors cursor-pointer">
    {title}
  </h3>
</Link>
        {/* Writer */}
        <p className="flex items-center gap-1.5 text-xs text-zinc-500">
          <FiUser size={11} className="shrink-0" />
          <span className="truncate">by {writerName}</span>
        </p>

        {/* Description */}
        {/* <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
          {description}
        </p> */}

        {/* Genre + Price row */}
<div className="w-full">
  <div className="flex items-center justify-between gap-2 py-3 border-t border-zinc-800/60">
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${genreStyle}`}>
      {genre}
    </span>
    <span className="text-base font-bold text-white">
      ${Number(price).toFixed(2)}
    </span>
  </div>
</div>

        {/* Status + Sales */}
        {/* <div className="flex items-center justify-between">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusStyle}`}>
            {status}
          </span>
        </div> */}

        {/* View Details button */}
        {/* <Link
          href={`/ebooks/${_id}`}
          className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] hover:opacity-90 transition-opacity shadow-md shadow-purple-500/20 mt-1"
        >
          View Details
        </Link> */}

      </div>
    </div>
  );
}