import React from 'react';
import { GetPublishedEBooks } from '../../../lib/api/book';
import BrowseEbookContainer from '@/components/Ebook/BrowseEbookContainer';

const BrowseEbookPage = async ({ searchParams }) => {
  const params = await searchParams;

  const result = await GetPublishedEBooks({
    search: params?.search,
    genre: params?.genre,
    sort: params?.sort,
    page: params?.page, 
  });

  // ADDED — since GetPublishedEBooks now always sends `page` (defaults to 1),
  // result is always the paginated shape: { total, books, page, limit }
  const books = Array.isArray(result?.books) ? result.books : [];
  const total = result?.total || 0;
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = result?.limit || 8;

  return (
    <div className="pt-28 px-4 md:px-8 max-w-7xl mb-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Browse Ebooks</h1>
        <p className="text-zinc-400 mt-2">
          Discover and read ebooks from talented writers.
        </p>
      </div>

      <BrowseEbookContainer
        books={books}
        total={total}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default BrowseEbookPage;