"use server"

import { serverMutation } from "../server"

export const addEbook = async (data) =>{
    const res = await serverMutation("/api/ebooks", "POST", data)

    return res
}