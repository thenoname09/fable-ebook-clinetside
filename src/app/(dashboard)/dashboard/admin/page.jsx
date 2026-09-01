import Link from "next/link";
import {
  FiUsers,
  FiEdit3,
  FiBookOpen,
  FiDollarSign,
  FiEye,
  FiEyeOff,
  FiUserCheck,
  FiArrowRight,
} from "react-icons/fi";

import { ServerSideGetUser } from "@/lib/session";
import { GetAdminAnalytics } from "@/lib/api/admin/data";

const QUICK_LINKS = [
  {
    href: "/dashboard/admin/manage-ebooks",
    label: "Manage Ebooks",
    icon: FiBookOpen,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    href: "/dashboard/admin/manage-users",
    label: "Manage Users",
    icon: FiUserCheck,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    href: "/dashboard/admin/transactions",
    label: "Transactions",
    icon: FiDollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const AdminOverviewPage = async () => {
  const user = await ServerSideGetUser();

  const rawStats = user ? await GetAdminAnalytics() : null;
  const stats = rawStats && typeof rawStats === "object" ? rawStats : {};

  const {
    totalReaders = 0,
    totalWriters = 0,
    totalEbooksSold = 0,
    totalRevenue = 0,
    totalPublished = 0,
    totalUnpublished = 0,
  } = stats;

  const STATS = [
    {
      label: "Published Books",
      value: totalPublished,
      icon: FiEye,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      label: "Ebooks Sold",
      value: totalEbooksSold,
      icon: FiBookOpen,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Total Revenue",
      value: `$${Number(totalRevenue).toFixed(2)}`,
      icon: FiDollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Unpublished Books",
      value: totalUnpublished,
      icon: FiEyeOff,
      color: "text-zinc-400",
      bg: "bg-zinc-500/10",
    },
    {
      label: "Total Readers",
      value: totalReaders,
      icon: FiUsers,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Total Writers",
      value: totalWriters,
      icon: FiEdit3,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Platform-wide stats at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-4 flex items-center gap-4"
          >
            <span
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${bg} ${color} shrink-0`}
            >
              <Icon size={22} />
            </span>
            <div>
              <p className="text-sm text-zinc-400">{label}</p>
              <p className="text-2xl font-bold text-white leading-tight">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* ADDED — quick links to sidebar sections */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ href, label, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 flex flex-col gap-3 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${bg} ${color}`}
              >
                <Icon size={18} />
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{label}</span>
                <FiArrowRight
                  size={14}
                  className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
