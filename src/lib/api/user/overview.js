import { protectedFetch } from "@/lib/server";

export const GetUserStats = async (userId) => {
  const result = await protectedFetch(`/api/reader/${userId}/stats`);
  return result;
};