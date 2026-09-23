import { requireRole } from '@/lib/session';
import React from 'react';
export const metadata = {
  title: {
    default: "User Dashboard - Fable",
    template: "%s - User Dashboard - Fable",
  },
  robots: {
    index: false,
    follow: false,
  },
};
const UserLayout =  async ({children}) => {
    await requireRole('reader')
    return children
};

export default UserLayout;