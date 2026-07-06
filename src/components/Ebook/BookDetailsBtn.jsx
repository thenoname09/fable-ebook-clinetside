"use client";


import Link from "next/link";
import { useState } from "react";
import { FiBookmark, FiShoppingBag } from "react-icons/fi";

const BookDetailsBtn = ({ book }) => {
  const {_id,writerId,price,title, } = book

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBuyBook = async () => {
    setIsLoading(true);

  const paymentData = {
      type: "buying",
       bookPrice: price.toFixed(2),
      bookId : _id,
     bookTitle : title,
      bookImage: book?.coverImage,
    }

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentData)

    });
 const data = await res.json();
 console.log(data)
 
  if (data?.url) {
      window.location.href = data.url;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex gap-3 pt-4">
 
      <button
        onClick={handleBuyBook}
        disabled={isLoading}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FiShoppingBag size={18} />
            Buy Book
          </>
        )}
      </button>

      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-white font-semibold hover:bg-zinc-800/50 transition-all"
      >
        <FiBookmark
          size={18}
          className={isBookmarked ? "fill-purple-400 text-purple-400" : "text-white"}
        />
        Bookmark
      </button>
    </div>
  );
};

export default BookDetailsBtn;