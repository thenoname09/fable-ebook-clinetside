import { MyPurchasedBooks } from '@/lib/api/purchasedBooks/data';
import { ServerSideGetUser } from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PurchasedEbooksPage = async() => {
     const user = await ServerSideGetUser();
    const MyPurchasedBookLists = await MyPurchasedBooks(user.id)

   
    return (
         <div className="min-h-screen bg-[#080808] px-4 py-10 pt-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          My Purchased Ebooks
        </h1>

        {MyPurchasedBookLists?.length === 0 ? (
          <p className="text-zinc-500">You haven't purchased any ebooks yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {MyPurchasedBookLists?.map((book) => (
              <Link
                key={book._id}
                href={`/dashboard/user/purchased-ebooks/${book.ebookId}`}
                className="group bg-[#0f0f0f] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors"
              >
                <div className="relative w-full aspect-[2/3] bg-zinc-900">
                  <Image
                    src={book.coverImage || '/placeholder-cover.png'}
                    alt={book.ebookTitle || 'Book cover'}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {book.ebookTitle || 'Untitled'}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    Purchased{' '}
                    {new Date(book.purchasedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    );
};

export default PurchasedEbooksPage;