import { serverFetch } from "@/lib/server";

export const getUserPayments = async (userId) => {
  

  const result = await serverFetch(`/api/paymentCollection/${userId}`);
  return result ;
};