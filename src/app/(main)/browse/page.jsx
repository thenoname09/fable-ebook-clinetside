

import React from 'react';
import { GetPublishedEBooks } from '../../../lib/api/book';
import BrowseEbookContainer from '@/components/Ebook/BrowseEbookContainer';

const BrowseEbookPage = async () => {
  const rawResult = await GetPublishedEBooks();
  const books = Array.isArray(rawResult) ? rawResult : [];

  return (
    <div className="pt-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Browse Ebooks</h1>
        <p className="text-zinc-400 mt-2">
          Discover and read ebooks from talented writers.
        </p>
      </div>

      <BrowseEbookContainer initialBooks={books} /> {/* CHANGED */}
    </div>
  );
};

export default BrowseEbookPage;