"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiBookmark, FiShoppingBag, FiCheckCircle } from "react-icons/fi";

const BookDetailsBtn = ({ book, user, hasPurchased }) => {
  const { _id, title } = book;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const cannotPurchase =
    !!user && (user.role === "writer" || user.role === "admin");

  const handleBuyBook = async () => {
    if (!user) {
      router.push(`/login?redirect=/browse/${_id}`);
      return;
    }

    if (cannotPurchase || hasPurchased) return;

    setIsLoading(true);

    const paymentData = {
      type: "buying",
      bookId: _id,
      bookTitle: title,
      bookImage: book?.coverImage,
      // bookPrice intentionally omitted — server looks up the real price
    };

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else if (data?.error) {
        console.error("Checkout error:", data.error);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const isButtonDisabled = isLoading || cannotPurchase || hasPurchased;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex gap-3">
        <button
          onClick={handleBuyBook}
          disabled={isButtonDisabled}
          title={
            cannotPurchase
              ? "Admins and Writers cannot purchase books"
              : hasPurchased
                ? "You already own this book"
                : ""
          }
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            hasPurchased
              ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 shadow-none"
              : "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-purple-500/20"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : hasPurchased ? (
            <>
              <FiCheckCircle size={18} />
              Already Owned
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
            className={
              isBookmarked ? "fill-purple-400 text-purple-400" : "text-white"
            }
          />
          Bookmark
        </button>
      </div>

      {cannotPurchase && (
        <p className="text-xs text-zinc-500">
          {user.role === "writer"
            ? "Writer accounts cannot purchase ebooks."
            : "Admin accounts cannot purchase ebooks."}
        </p>
      )}
    </div>
  );
};

export default BookDetailsBtn;
