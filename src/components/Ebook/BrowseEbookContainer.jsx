import { Suspense } from "react";
import BookCard from "./BookCard";
import SearchBook from "./SearchBook";
import BookPagination from "./BookPagination";

const BrowseEbookContainer = ({ books, total, currentPage, itemsPerPage }) => {
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

      {total > 0 && (
        <div className="mt-10 flex justify-center">
          <Suspense fallback={null}>
            <BookPagination
              currentPage={currentPage}
              totalItems={total}
              itemsPerPage={itemsPerPage}
            />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default BrowseEbookContainer;