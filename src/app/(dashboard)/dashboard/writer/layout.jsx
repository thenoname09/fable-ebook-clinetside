import { requireRole } from '@/lib/session';
import React from 'react';

const writerLayout =  async ({children}) => {
    await requireRole('writer')
    return children
};

export default writerLayout;