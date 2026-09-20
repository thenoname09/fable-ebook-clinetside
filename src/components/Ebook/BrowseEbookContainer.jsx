"use client";

import { useState } from "react";
import BookCard from "./BookCard";
import SearchBook from "./SearchBook";


const BrowseEbookContainer = ({ initialBooks }) => { // CHANGED: was BrowseEbookClient
  const [filteredBooks, setFilteredBooks] = useState(initialBooks);

  return (
    <>
      <div className="mb-6">
        <SearchBook books={initialBooks} onFilteredChange={setFilteredBooks} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-center text-zinc-500 py-20">
          No ebooks match your search.
        </p>
      )}
    </>
  );
};

export default BrowseEbookContainer; // CHANGED