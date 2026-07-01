
import { serverFetch } from "../server";

export const GetAllEBooks = async () => {


  const result = await serverFetch(   `/api/ebooks`);
  //   console.log(result, 'my events');

  return result;
};