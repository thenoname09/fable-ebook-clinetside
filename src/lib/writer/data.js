import { serverFetch } from "../server";


export const myMangeBook = async (email) => {


  const result = await serverFetch(`/api/ebooks/writer/${email}`);
  //   console.log(result, 'my events');

  return result;
};