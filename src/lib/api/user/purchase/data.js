import { serverFetch } from "@/lib/server";



// for payment data show
export const getUserPayments = async (userId) => {
  

  const result = await serverFetch(`/api/paymentCollection/${userId}`);
  return result ;
};