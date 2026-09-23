import BookDetails from '@/components/Ebook/BookDetails';
import { GetEBooksById } from '@/lib/api/book';
import { notFound } from "next/navigation"; 
const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const book = await GetEBooksById(id);

  if (!book || !book._id) {
    notFound(); // renders your global app/not-found.jsx
  }

  return (
    <div className='pt-28 px-4 md:px-8 max-w-7xl mx-auto'>
      <BookDetails book={book} />
    </div>
  );
};

export default BookDetailsPage;