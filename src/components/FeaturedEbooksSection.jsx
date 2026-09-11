import { GetFeaturedEBooks } from "@/lib/api/book";
import FeaturedEbooksClient from "./FeaturedEbooksClient";

const FeaturedEbooksSection = async () => {
  
  const rawResult = await GetFeaturedEBooks();
  const books = Array.isArray(rawResult) ? rawResult.slice(0, 8) : []; 
  
  if (books.length === 0) return null; 

  return <FeaturedEbooksClient books={books} />;
};

export default FeaturedEbooksSection;