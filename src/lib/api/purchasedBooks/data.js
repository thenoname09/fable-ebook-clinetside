import { serverFetch } from "@/lib/server";

export const MyPurchasedBooks = async (id) => {


  const result = await serverFetch(   `/api/bookBuyCollection/${id}`);


  return result;
};


export const GetPurchasedBookByRead = async (userId, ebookId) => {
  const result = await serverFetch(`/api/bookBuyCollection/${userId}/${ebookId}`);
  return result;
};