import { protectedFetch, serverFetch } from "@/lib/server";



// for payment data show
export const getUserPayments = async (userId) => {
  

  const result = await protectedFetch(`/api/paymentCollection/${userId}`);
  return result ;
};