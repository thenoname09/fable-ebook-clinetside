import { requireRole } from '@/lib/session';
import React from 'react';


export const metadata = {
  title: {
    default: "Admin Dashboard - Fable",
    template: "%s - Admin Dashboard - Fable",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const AdminLayout =  async ({children}) => {
    await requireRole('admin')
    return children
};

export default AdminLayout;