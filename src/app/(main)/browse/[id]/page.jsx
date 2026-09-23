import BookDetails from '@/components/Ebook/BookDetails';
import { GetEBooksById } from '@/lib/api/book';
import { notFound } from "next/navigation"; 

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await GetEBooksById(id);

  if (!book || !book._id) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: `${book.title} - Fable`,
    description: book.description || `Read ${book.title} on Fable.`,
    
  };
}



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