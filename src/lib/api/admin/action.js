"use server"

import { DeleteMutation, serverMutation } from "@/lib/server"
import { revalidatePath } from "next/cache"

export const adminEbookUpdate = async (data, id) => {
    const res = await serverMutation(`/api/ebooks/${id}`, "PATCH", data)
    revalidatePath('/dashboard/admin/manage-ebooks') 
    return res
}

export const adminDeleteMutation = async (id) => {
    const res = await DeleteMutation(`/api/ebooks/${id}`, "DELETE")
    revalidatePath('/dashboard/admin/manage-ebooks')

    return res
}


export const adminUserRoleUpdate = async (data, id) => {
    const res = await serverMutation(`/api/users/${id}`, "PATCH", data)
    return res
}

export const adminUserDelete = async (id) => {
    const res = await DeleteMutation(`/api/users/${id}`, "DELETE")
    return res
}