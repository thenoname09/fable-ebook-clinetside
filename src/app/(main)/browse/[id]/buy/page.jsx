
import { redirect } from 'next/navigation';
import React from 'react';

const page =  async({params}) => {
    const  {id} =await params
        const session = await auth.api.getSession({
            headers: await headers()
        })
       const user= session?.user
if(!user){
    redirect(`/login?redirect=/browse/${id}/buy`)
}
    return (
        <div className='pt-28 px-4 md:px-8 max-w-7xl mx-auto'>
            hello
        </div>
    );
};

export default page;