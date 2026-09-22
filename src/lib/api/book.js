
import { serverFetch,protectedFetch } from "../server";

export const GetAllEBooks = async () => {


  const result = await protectedFetch(   `/api/ebooks/manage`);

  return result;
};
export const GetPublishedEBooks = async ({ search, genre, sort, page = 1 } = {}) => {
  const params = new URLSearchParams({ status: "published", page });
  if (search) params.set("search", search);
  if (genre && genre !== "all") params.set("genre", genre);
  if (sort) params.set("sort", sort);

  const result = await serverFetch(`/api/ebooks?${params.toString()}`);
  return result; // always { total, books, page, limit } now, since page is always sent
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

export const GetTopWriters = async () => {
  const result = await serverFetch(`/api/public/top-writers`);
  return result;
};