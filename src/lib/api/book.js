
import { serverFetch } from "../server";

export const GetAllEBooks = async () => {


  const result = await serverFetch(   `/api/ebooks`);

  return result;
};

export const GetEBooksById = async (id) => {


  const result = await serverFetch(   `/api/ebooks/${id}`);


  return result;
};