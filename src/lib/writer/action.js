"use server"

import { revalidatePath } from "next/cache"
import { DeleteMutation, serverMutation } from "../server"

export const addEbook = async (data) =>{
    const res = await serverMutation("/api/ebooks", "POST", data)

    return res
}

export const EbookUpdate = async (data,id) =>{
    const res = await serverMutation(`/api/ebooks/${id}`, "PATCH", data)
    revalidatePath('/dashboard/writer/manage')
    return res
}

export const EbookDelete = async (id) => {
  const res = await DeleteMutation(`/api/ebooks/${id}`, "DELETE",);
  return res;
};