import { GetEBooksById } from "@/lib/api/book";
import { GetPurchasedBookByRead } from "@/lib/api/purchasedBooks/data";
import { ServerSideGetUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";

const PurchasedEbookDetailsPage = async ({ params }) => {
  const { bookid } = await params;
  const user = await ServerSideGetUser();

  const purchasedBook = await GetPurchasedBookByRead(user.id, bookid);

  // ownership check — route returns { message: "Purchase not found" } on 404
  if (!purchasedBook || purchasedBook.message === "Purchase not found") {
    notFound();
  }

  const bookDetails = await GetEBooksById(bookid);

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-10 pt-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard/user/purchased-ebooks"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to My Ebooks
        </Link>

        <div className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
            {/* Cover */}
            <div className="relative w-full aspect-[2/3] sm:aspect-auto bg-zinc-900">
              <Image
                src={
                  bookDetails?.coverImage ||
                  purchasedBook.coverImage ||
                  "/placeholder-cover.png"
                }
                alt={
                  bookDetails?.title || purchasedBook.ebookTitle || "Book cover"
                }
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {bookDetails?.title || purchasedBook.ebookTitle || "Untitled"}
                </h1>

                {bookDetails?.writerName && (
                  <p className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1.5">
                    <FiUser size={13} />
                    by {bookDetails.writerName}
                  </p>
                )}

                {bookDetails?.genre && (
                  <span className="inline-block mt-2.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 capitalize">
                    {bookDetails.genre}
                  </span>
                )}
              </div>

              {/* Full description */}
              {bookDetails?.fullDescription && (
                <div>
                  <h2 className="text-sm font-semibold text-zinc-300 mb-2">
                    full Content
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                    {bookDetails.fullDescription}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <FiCalendar size={15} />
                Purchased on{" "}
                {new Date(purchasedBook.purchasedDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedEbookDetailsPage;
