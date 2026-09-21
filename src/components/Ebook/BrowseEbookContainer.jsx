import { Suspense } from "react";
import BookCard from "./BookCard";
import SearchBook from "./SearchBook";

const BrowseEbookContainer = ({ books }) => {
  return (
    <>
      <div className="mb-8">
        <Suspense fallback={null}>
          <SearchBook />
        </Suspense>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-zinc-500 py-20">
          No ebooks match your search.
        </p>
      )}
    </>
  );
};

export default BrowseEbookContainer;