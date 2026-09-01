import { GetUserStats } from "@/lib/api/user/overview";
import { ServerSideGetUser } from "@/lib/session";
import Link from "next/link";
import {
  FiBookOpen,
  FiDollarSign,
  FiBookmark,
  FiShoppingBag,
  FiClock,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";



const QUICK_LINKS = [
  { href: "/dashboard/user/purchased-ebooks", label: "Purchased Ebooks", icon: FiBookOpen, color: "text-purple-400", bg: "bg-purple-500/10" },
  { href: "/dashboard/user/purchase-history", label: "Purchase History", icon: FiShoppingBag, color: "text-sky-400", bg: "bg-sky-500/10" },
  { href: "/dashboard/user/bookmarks", label: "Bookmarks", icon: FiBookmark, color: "text-amber-400", bg: "bg-amber-500/10" },
  { href: "/dashboard/user/profile", label: "Profile", icon: FiUser, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const UserOverviewPage = async () => {
  const user = await ServerSideGetUser();

  const stats = user
    ? await GetUserStats(user.id)
    : { totalBooks: 0, totalSpent: 0, recentPurchases: [] };

  const { totalBooks = 0, totalSpent = 0, recentPurchases = [] } = stats || {};
  const totalBookmarks = 0; 

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(" ")[0] || "Reader"} 
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
         Track your reading journey and explore your personal collection.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <FiBookOpen size={20} />
          </span>
          <div>
            <p className="text-xs text-zinc-500">Books Purchased</p>
            <p className="text-xl font-bold text-white leading-tight">{totalBooks}</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <FiDollarSign size={20} />
          </span>
          <div>
            <p className="text-xs text-zinc-500">Total Spent</p>
            <p className="text-xl font-bold text-white leading-tight">${Number(totalSpent).toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <FiBookmark size={20} />
          </span>
          <div>
            <p className="text-xs text-zinc-500">Bookmarks</p>
            <p className="text-xl font-bold text-white leading-tight">{totalBookmarks}</p>
            <p className="text-[10px] text-zinc-600">Coming soon</p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_LINKS.map(({ href, label, icon: Icon, color, bg }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 flex flex-col gap-3 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors"
          >
            <span className={`flex items-center justify-center w-10 h-10 rounded-lg ${bg} ${color}`}>
              <Icon size={18} />
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{label}</span>
              <FiArrowRight size={14} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent purchases */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <FiClock size={14} className="text-purple-400" /> Recent Purchases
          </h2>
          <Link href="/dashboard/user/purchase-history" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            View All →
          </Link>
        </div>

        {recentPurchases.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-8">
            No purchases yet — <Link href="/browse" className="text-purple-400 hover:underline">browse ebooks</Link> to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {recentPurchases.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-zinc-800/30 border border-zinc-800/50"
              >
                <span className="text-sm text-zinc-200 truncate">{p.ebookTitle}</span>
                <span className="text-xs text-zinc-500 shrink-0 ml-3">${Number(p.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverviewPage;