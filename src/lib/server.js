import { baseUrl } from "./baseUrl"

// serverMutation for Post,PATCH
export const serverMutation = async(path,method,data)=>{
    const res = await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            "Content-Type" : "application/json"

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

export const DeleteMutation = async(path,method)=>{
    const res = await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            "Content-Type" : "application/json"

        },
        

    })
    return res.json()
}
