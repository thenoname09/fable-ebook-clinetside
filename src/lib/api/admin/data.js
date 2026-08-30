import { serverFetch } from "@/lib/server";


export const GetAllUsers = async () => {
  const result = await serverFetch(`/api/users`);
  return result;
};