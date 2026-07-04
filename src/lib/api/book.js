
import { serverFetch } from "../server";

export const GetAllEBooks = async () => {


  const result = await serverFetch(   `/api/ebooks`);
  //   console.log(result, 'my events');

  return result;
};

export const GetEBooksById = async (id) => {


  const result = await serverFetch(   `/api/ebooks/${id}`);
  //   console.log(result, 'my events');

  return result;
};