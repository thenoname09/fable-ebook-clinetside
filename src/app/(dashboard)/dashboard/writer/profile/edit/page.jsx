
import UserUpdate from '@/components/Dashboard/UserUpdate';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';


const EditPage = async () => {
     const session = await auth.api.getSession({
    headers: await headers(),
  })
    return (
        <div>
            <UserUpdate session={session}></UserUpdate>
        </div>
    );
};

export default EditPage;