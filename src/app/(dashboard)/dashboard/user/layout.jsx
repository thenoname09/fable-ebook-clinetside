import { requireRole } from '@/lib/session';
import React from 'react';

const UserLayout =  async ({children}) => {
    await requireRole('reader')
    return children
};

export default UserLayout;