import { serverFetch,protectedFetch } from "@/lib/server";

export const MyPurchasedBooks = async (id) => {


  const result = await protectedFetch(   `/api/bookBuyCollection/${id}`);


  return result;
};


export const GetPurchasedBookByRead = async (userId, ebookId) => {
  const result = await protectedFetch(`/api/bookBuyCollection/${userId}/${ebookId}`);
  return result;
};