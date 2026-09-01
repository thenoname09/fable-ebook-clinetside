import { protectedFetch } from "@/lib/server";


export const GetAllUsers = async () => {
  const result = await protectedFetch(`/api/users`);
  return result;
};
export const GetAdminAnalytics = async () => {
  const result = await protectedFetch(`/api/admin/analytics`);
  return result;
};