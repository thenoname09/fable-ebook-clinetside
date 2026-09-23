import { requireRole } from '@/lib/session';
import React from 'react';

export const metadata = {
  title: {
    default: "Writer Dashboard - Fable",
    template: "%s - Writer Dashboard - Fable",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const writerLayout =  async ({children}) => {
    await requireRole('writer')
    return children
};

export default writerLayout;