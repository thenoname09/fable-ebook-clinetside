import React, { Suspense } from 'react';
import ManageEventClient from './ManageEventClient';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

import { Spinner } from '@heroui/react';
import { myMangeBook } from '@/lib/writer/data';


const ManageEvent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
     console.log('Session email:', session?.user?.email);
    const events = await myMangeBook (session?.user?.email) 
    
    return (
        <Suspense  fallback={<Spinner />}>
            <ManageEventClient events={events} /> 
        </Suspense>
    );
};

export default ManageEvent;