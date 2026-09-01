"use server"
import { baseUrl } from "./baseUrl"
import { getTokenServer } from "./getTokenServer";


export const authHeader = async () => {
  const token = await getTokenServer();
  const header = token ? { authorization: `Bearer ${token}` } : {};

  return header
};





// serverMutation for Post,PATCH
export const serverMutation = async(path,method,data)=>{
const headers = await authHeader();
    const res = await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            "Content-Type" : "application/json",
           ...headers,
        },
        body:JSON.stringify(data)

    })
    return res.json()
}
// serverFetch for getData
export const serverFetch = async(path,)=>{
    const res = await fetch(`${baseUrl}${path}`)
    return res.json()
}


export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeader()
    });
    return res.json();
}



export const DeleteMutation = async(path,method)=>{
    const headers = await authHeader();
    const res = await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            "Content-Type" : "application/json",
             ...headers,

        },
        

    })
    return res.json()
}
