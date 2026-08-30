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
    <div className="w-full max-w-2xl mx-auto pb-10 px-4 sm:px-0"> {/* ADDED: side padding on mobile so card doesn't touch screen edges */}
  <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
    {/* Banner */}
    <div className="h-20 sm:h-24 w-full bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-zinc-900/20" /> {/* CHANGED: shorter banner on mobile */}

    <div className="px-4 sm:px-6 pb-6"> {/* CHANGED: less horizontal padding on mobile */}
      {/* Avatar row */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 -mt-8 sm:-mt-10"> {/* CHANGED: stack vertically on mobile, less negative margin */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 border-[#080808] bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center overflow-hidden shadow-xl shrink-0"> {/* CHANGED: smaller avatar on mobile */}
          {user?.image ? (
            <Image src={user.image} alt={user.name} fill className="object-cover" />
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-purple-300"> {/* CHANGED: smaller initials text on mobile */}
              {getInitials(user?.name)}
            </span>
          )}
        </div>

        <div className="mb-1 min-w-0"> {/* ADDED: min-w-0 lets truncate work inside flex */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate"> {/* CHANGED: smaller + truncate for long names on mobile */}
              {user?.name ?? "User"}
            </h1>
            <FiCheckCircle size={16} className="text-purple-400 shrink-0" />
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 capitalize mt-1">
            <FiUser size={10} /> {user?.role ?? "reader"}
          </span>
        </div>
      </div>

      {/* Account info */}
      <div className="mt-6 space-y-3 border-t border-zinc-800/50 pt-6">
        <div className="flex items-center gap-2 sm:gap-3 text-sm"> {/* CHANGED: tighter gap on mobile */}
          <FiMail size={15} className="text-zinc-500 shrink-0" />
          <span className="text-zinc-400 shrink-0">Email</span> {/* ADDED shrink-0 so label never compresses */}
          <span className="text-white ml-auto truncate max-w-[55%] sm:max-w-none text-right"> {/* CHANGED: truncate long emails on mobile */}
            {user?.email}
          </span>
        </div>

        {user?.createdAt && (
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <FiCalendar size={15} className="text-zinc-500 shrink-0" />
            <span className="text-zinc-400 shrink-0">Member since</span>
            <span className="text-white ml-auto text-right">
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
        <Link href="/dashboard/user/profile/edit" className="block sm:inline-block"> {/* ADDED: full-width tap target on mobile */}
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white text-sm font-semibold hover:opacity-90 transition-opacity"> {/* CHANGED: full-width button on mobile, easier to tap */}
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