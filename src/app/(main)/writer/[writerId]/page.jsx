import { GetEBooksByWriterId } from "@/lib/api/book";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiBookOpen } from "react-icons/fi";

export default async function WriterPublicProfile({ params }) {
  const { writerId } = await params;

  const books = await GetEBooksByWriterId(writerId);

  if (!books || books.length === 0) {
    notFound();
  }

  const { writerName, writerEmail } = books[0]; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <FiArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Browse</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Writer header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {writerName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{writerName}</h1>
              <FiCheckCircle size={18} className="text-purple-400" />
            </div>
            <p className="text-sm text-zinc-500">{books.length} published books</p>
          </div>
        </div>

        {/* Books grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FiBookOpen size={18} />
            Books by {writerName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <Link
                key={book._id}
                href={`/browse/${book._id}`} // ⚠️ confirm this matches your actual book-detail route path
                className="group"
              >
               <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-900">
  <Image
    src={book.coverImage}
    alt={book.title}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  />
</div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-semibold text-white leading-tight truncate">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-zinc-500 capitalize">{book.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}