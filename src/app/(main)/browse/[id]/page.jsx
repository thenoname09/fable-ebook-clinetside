import BookDetails from '@/components/Ebook/BookDetails';
import { GetEBooksById } from '@/lib/api/book';

import React from 'react';

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const book = await GetEBooksById(id);


  if(!book){
    return (<div className='pt-28 px-4 md:px-8 max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold text-red-500'>Book not found</h1>
      </div>)
  }
  return (
    <div className='pt-28 px-4 md:px-8 max-w-7x1  mx-auto'>
      <BookDetails book={book} />

    </div>
  );
};

export default BookDetailsPage;