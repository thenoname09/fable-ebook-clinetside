import BookCard from '@/components/Ebook/BookCard';
import { GetAllEBooks } from '@/lib/api/book';
import React from 'react';

const BrowseEbookPage = async() => {

    const books = await GetAllEBooks()
    
    return (
     <div className="pt-28 px-4 md:px-8 max-w-7xl mx-auto">
      
      <div className="mb-8">
  <h1 className="text-3xl font-bold text-white">Browse Ebooks</h1>
  <p className="text-zinc-400 mt-2">
    Discover and read ebooks from talented writers.
  </p>
</div>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Empty state */}
      {books?.length === 0 && (
        <p className="text-center text-zinc-500 py-20">
          No ebooks available yet.
        </p>
      )}

    </div>
  );
};


export default BrowseEbookPage;