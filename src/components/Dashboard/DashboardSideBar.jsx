"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid,
  FiBookOpen,
  FiPlusCircle,
  FiTrendingUp,
  FiBookmark,
  FiLogOut,
  FiUser,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardSideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const writerMenu = [
    { key: "overview", name: "Overview", href: "/dashboard/writer", icon: FiGrid },
    { key: "add-ebook", name: "Add Ebook", href: "/dashboard/writer/add-ebook", icon: FiPlusCircle },
    { key: "manage-ebooks", name: "Manage Ebooks", href: "/dashboard/writer/manage", icon: FiBookOpen },
    { key: "sales-history", name: "Sales History", href: "/dashboard/writer/sales", icon: FiTrendingUp },
    { key: "bookmarks", name: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: FiBookmark },
    { key: "profile", name: "Profile", href: "/dashboard/writer/profile", icon: FiUser },
  ];

  const readerMenu = [
    { key: "overview", name: "Overview", href: "/dashboard/user", icon: FiGrid },
    { key: "purchased-ebooks", name: "Purchased Ebooks", href: "/dashboard/user/purchased-ebooks", icon: FiBookOpen },
    { key: "purchase-history", name: "Purchase History", href: "/dashboard/user/purchase-history", icon: FiShoppingBag },
    { key: "bookmarks", name: "Bookmarks", href: "/dashboard/user/bookmarks", icon: FiBookmark },
    { key: "profile", name: "Profile", href: "/dashboard/user/profile", icon: FiUser },
  ];

  const adminMenu = [
    { key: "overview", name: "Overview", href: "/dashboard/admin", icon: FiGrid },
    { key: "manage-ebooks", name: "Manage Ebooks", href: "/dashboard/admin/manage-ebooks", icon: FiBookOpen },
    { key: "manage-users", name: "Manage Users", href: "/dashboard/admin/manage-users", icon: FiUsers },
    { key: "transactions", name: "Transactions", href: "/dashboard/admin/transactions", icon: FiDollarSign },
  ];

  const userRole = user?.role;
  const navItems =
    userRole === "writer"
      ? writerMenu
      : userRole === "reader"
      ? readerMenu
      : userRole === "admin"
      ? adminMenu
      : [];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Desktop-only. Mobile nav for the dashboard lives inside Navbar's
  // hamburger dropdown instead, so there is only one mobile menu site-wide.
  return (
    <aside className="hidden md:flex fixed left-0 w-64 bg-[#0f0f0f] border-r border-zinc-800/60 p-4 flex-col justify-between top-16 h-[calc(100vh-4rem)] z-20">
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative
                ${
                  isActive
                    ? "bg-purple-600/10 text-[#c084fc] border border-purple-500/20 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 w-1 h-5 bg-gradient-to-b from-[#c084fc] to-[#818cf8] rounded-r-md" />
              )}
              <Icon
                className={`text-lg transition-colors ${
                  isActive ? "text-[#c084fc]" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="border-t border-zinc-800/60 pt-4 mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {user.image ? (
              <Image
                src={user.image}
                width={36}
                height={36}
                alt={user.name || "User profile"}
                className="w-9 h-9 rounded-xl object-cover bg-zinc-800 border border-zinc-700/50"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-[#c084fc] font-semibold text-xs shrink-0 tracking-wider">
                {getInitials(user.name)}
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-zinc-200 truncate">
                {user.name || "Workspace Account"}
              </span>
              <span className="text-xs text-zinc-500 truncate">{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            title="Log Out Account"
            className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all shrink-0 group border border-transparent hover:border-rose-500/10"
          >
            <FiLogOut size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </aside>
  );
}