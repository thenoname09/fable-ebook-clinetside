
import { serverFetch,protectedFetch } from "../server";

export const GetAllEBooks = async () => {


  const result = await protectedFetch(   `/api/ebooks/manage`);

  return result;
};
export const GetPublishedEBooks = async () => {
  const result = await serverFetch(`/api/ebooks?status=published`);
  return result;
};


export const GetFeaturedEBooks = async () => {
  const result = await serverFetch(`/api/ebooks?status=published&limit=6`);
  return result;
};







export const GetEBooksById = async (id) => {


  const result = await serverFetch(   `/api/ebooks/${id}`);


  return result;
};

export const GetEBooksByWriterId = async (writerId) => {
  const result = await serverFetch(`/api/ebooks?writerId=${writerId}`);
  return result;
};