import { serverFetch } from "../server";


// export const myMangeBook = async (email) => {


//   const result = await serverFetch(`/api/ebooks/writer/${email}`);
//   

//   return result;
// };
export const myMangeBook = async (email) => {


  const result = await serverFetch(   `/api/ebooks?writerEmail=${(email)}`);
 
  return result;
};