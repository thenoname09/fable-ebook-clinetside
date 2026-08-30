import Image from "next/image";
import Link from "next/link";
import { FiMail, FiCalendar, FiEdit2, FiUser, FiCheckCircle } from "react-icons/fi";
import { ServerSideGetUser } from "@/lib/session";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const user = await ServerSideGetUser();

 

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-10">
      <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
        {/* Banner */}
        <div className="h-24 w-full bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-zinc-900/20" />

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex items-end gap-4 -mt-10">
            <div className="relative w-20 h-20 rounded-2xl border-4 border-[#080808] bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center overflow-hidden shadow-xl shrink-0">
              {user?.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              ) : (
                <span className="text-2xl font-bold text-purple-300">
                  {getInitials(user?.name)}
                </span>
              )}
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{user?.name ?? "User"}</h1>
                <FiCheckCircle size={16} className="text-purple-400" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 capitalize mt-1">
                <FiUser size={10} /> {user?.role ?? "reader"}
              </span>
            </div>
          </div>

          {/* Account info */}
          <div className="mt-6 space-y-3 border-t border-zinc-800/50 pt-6">
            <div className="flex items-center gap-3 text-sm">
              <FiMail size={15} className="text-zinc-500 shrink-0" />
              <span className="text-zinc-400">Email</span>
              <span className="text-white ml-auto">{user?.email}</span>
            </div>

            {user?.createdAt && (
              <div className="flex items-center gap-3 text-sm">
                <FiCalendar size={15} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-400">Member since</span>
                <span className="text-white ml-auto">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Edit button */}
          <div className="mt-6 border-t border-zinc-800/50 pt-6">
            <Link href="/dashboard/user/profile/edit"> 
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <FiEdit2 size={14} />
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;