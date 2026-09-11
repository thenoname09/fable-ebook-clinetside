import React from 'react';
import TopWritersClient from './TopWritersClient';
import { GetTopWriters } from '@/lib/api/book';

const TopWritersSection = async () => {
    const rawResult = await GetTopWriters();
  
  
  const writers = Array.isArray(rawResult) ? rawResult : [];
    return (
        <div>
            <TopWritersClient writers={writers} />
        </div>
    );
};

export default TopWritersSection;