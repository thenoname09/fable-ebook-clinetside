import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import BookCard from "@/components/Ebook/BookCard";
import { GetFeaturedEBooks } from "@/lib/api/book";

const FeaturedEbooksSection = async () => {
  const rawResult = await GetFeaturedEBooks();
  const books = Array.isArray(rawResult) ? rawResult : []; // defensive guard, same pattern as elsewhere

  if (books.length === 0) return null; // don't render an empty section at all

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Featured Ebooks</h2>
          <p className="text-zinc-400 mt-1 text-sm">
            Fresh picks from our latest published titles.
          </p>
        </div>
        <Link
          href="/browse"
          className="hidden sm:flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All <FiArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All Ebooks <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedEbooksSection;