import { baseUrl } from '@/lib/baseUrl';
import { stripe } from '@/lib/stripe';
import Link from 'next/link';
import { FiCheckCircle, FiBookOpen, FiArrowRight, FiDownload } from 'react-icons/fi';

export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  // ── fetch Stripe session ────────────────────────────────────────────────────
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });
  console.log(session)

  const {
    customer_details,
    metadata,
    amount_total,
    payment_intent,
  } = session;

  // ── save purchase to MongoDB ────────────────────────────────────────────────
  const purchaseData = {
    ebookId:         metadata?.bookId,
    ebookTitle:      metadata?.bookTitle,
    coverImage:      metadata?.bookImage,
    buyerId:         metadata?.userId,
    buyerName:       customer_details?.name,
    buyerEmail:      customer_details?.email,
    
    amount:          amount_total / 100,       
    paymentIntentId: payment_intent?.id,
    sessionId:       session_id,
    status:          "completed",
    purchasedAt:     new Date(),
  };

//   const res = await fetch(`${baseUrl}/api/bookBuyCollections`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(purchaseData),
//   });

//   const data = await res.json();

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16 pt-21">
      <div className="w-full max-w-md space-y-5">

        {/* ── Success card ─────────────────────────────────────── */}
        <div className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl overflow-hidden">

          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#c084fc] to-[#818cf8]" />

          <div className="p-8 flex flex-col items-center text-center gap-5">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <FiCheckCircle size={30} className="text-emerald-400" />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Payment Successful!
              </h1>
              <p className="text-sm text-zinc-500">
                Your purchase is confirmed. You can now read your ebook.
              </p>
            </div>

            {/* Ebook info */}
            

            {/* Order summary */}
            <div className="w-full space-y-2.5">
               
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">E-book Name</span>
                <span className="text-white font-semibold">
                 {metadata.bookTitle}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Amount paid</span>
                <span className="text-white font-semibold">
                  ${(amount_total / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Email</span>
                <span className="text-zinc-300 truncate max-w-[200px]">
                  {customer_details?.email}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Payment ID</span>
                <span className="text-zinc-600 text-xs font-mono truncate max-w-[160px]">
                  {typeof payment_intent === 'object'
                    ? payment_intent?.id
                    : payment_intent}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-800" />

            {/* Actions */}
            <div className="w-full flex flex-col gap-2.5">
              <Link
                href={`/ebooks/${metadata?.ebookId}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
                <FiBookOpen size={15} />
                Read Ebook Now
              </Link>
              <Link
                href="/dashboard/user"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-zinc-400 border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Go to Dashboard
                <FiArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>

        {/* ── Bottom note ───────────────────────────────────────── */}
        <p className="text-center text-xs text-zinc-600">
          A receipt has been sent to{" "}
          <span className="text-zinc-500">{customer_details?.email}</span>
        </p>

      </div>
    </div>
  );
}