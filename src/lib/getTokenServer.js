"use server"
import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenServer = async () => {
  try {
    const result = await auth.api.getToken({ headers: await headers() });
    return result?.token || null;
  } catch (error) {
    console.error("getTokenServer failed:", error);
    return null;
  }
};