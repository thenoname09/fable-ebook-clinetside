"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiGrid, 
  FiBookOpen, 
  FiPlusCircle, 
  FiTrendingUp, 
  FiBookmark,
  FiMenu,
  FiX,
  FiLogOut, // 
  FiUser,
  FiShoppingBag,
  FiUsers,
  FiDollarSign
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";



export default function DashboardSideBar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
   const router = useRouter();
  
  const { data: session ,isPending} = authClient.useSession();
  const user = session?.user;

const writerMenu = [
  { key: "overview", name: "Overview", href: "/dashboard/writer", icon: FiGrid },
  { key: "manage-ebooks", name: "Manage Ebooks", href: "/dashboard/writer/manage", icon: FiBookOpen },
  { key: "add-ebook", name: "Add Ebook", href: "/dashboard/writer/add-ebook", icon: FiPlusCircle },
  { key: "sales-history", name: "Sales History", href: "/dashboard/writer/sales", icon: FiTrendingUp },
  { key: "bookmarks", name: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: FiBookmark },
  { key: "profile", name: "Profile", href: "/dashboard/writer/profile", icon: FiUser },
];
// const readerMenu = [
//   { key: "overview",          name: "Overview",          href: "/dashboard/user",              icon: FiGrid        },
//   { key: "purchase-history",  name: "Purchase History",  href: "/dashboard/purchase-history",  icon: FiShoppingBag },
//   { key: "purchased-ebooks",  name: "Purchased Ebooks",  href: "/dashboard/purchased-ebooks",  icon: FiBookOpen    },
//   { key: "bookmarks",         name: "Bookmarks",         href: "/dashboard/bookmarks",         icon: FiBookmark    },
//   { key: "profile",           name: "Profile",           href: "/dashboard/profile",           icon: FiUser        },
// ];
// const adminMenu = [
//   { key: "overview",        name: "Overview",        href: "/dashboard/admin",         icon: FiGrid        },
//   { key: "manage-users",    name: "Manage Users",    href: "/dashboard/manage-users",  icon: FiUsers       },
//   { key: "manage-ebooks",   name: "Manage Ebooks",   href: "/dashboard/manage-ebooks", icon: FiBookOpen    },
//   { key: "transactions",    name: "Transactions",    href: "/dashboard/transactions",  icon: FiDollarSign  },
// ];

  const userRole = user?.role;
const navItems =
  userRole === "writer"
    ? writerMenu
    : userRole === "reader"
    ? readerMenu
    : userRole === "admin"
    ? adminMenu
    : [];



  const closeSidebar = () => setIsMobileOpen(false);

  const handleSignOut = async () => {
   await authClient.signOut();
       router.refresh();
  };

  // Helper utility to extract first characters for fallback letter avatars
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* 📱 1. MOBILE WORKSPACE MENU TOGGLE BAR */}
      <div className="md:hidden sticky top-16 z-40 w-full bg-[#0f0f0f]/95 backdrop-blur-md border-b border-zinc-800/60 px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
          Workspace Menu
        </span>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white transition-colors"
        >
          {isMobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {/* 🪟 2. MOBILE BACKGROUND BACKDROP OVERLAY */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black/70 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 🗂️ 3. DOCKABLE DASHBOARD ASIDE NAVIGATION PANELS */}
      <aside className={`
        fixed left-0 w-64 bg-[#0f0f0f] border-r border-zinc-800/60 p-4 transition-transform duration-300
       
        flex flex-col justify-between
  
        top-[113px] bottom-0 z-30
       
        md:top-16 md:h-[calc(100vh-4rem)] md:z-20 md:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        
        {/* Top Section: Dashboard Navigation Menu Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative
                  ${isActive 
                    ? "bg-purple-600/10 text-[#c084fc] border border-purple-500/20 font-semibold" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 w-1 h-5 bg-gradient-to-b from-[#c084fc] to-[#818cf8] rounded-r-md" />
                )}
                <Icon className={`text-lg transition-colors ${isActive ? "text-[#c084fc]" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 👤 Bottom Section: Better-Auth Profile User Panel */}
        {user && (
          <div className="border-t border-zinc-800/60 pt-4 mt-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              {/* Profile Image / Fallback Initials Badge */}
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || "User profile"} 
                  className="w-9 h-9 rounded-xl object-cover bg-zinc-800 border border-zinc-700/50"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-[#c084fc] font-semibold text-xs shrink-0 tracking-wider">
                  {getInitials(user.name)}
                </div>
              )}

              {/* Identity Descriptions String Blocks */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-zinc-200 truncate">
                  {user.name || "Workspace Account"}
                </span>
                <span className="text-xs text-zinc-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Logout Core Action Button Wrapper */}
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
    </>
  );
}