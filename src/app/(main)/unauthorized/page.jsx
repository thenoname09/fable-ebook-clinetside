import Link from "next/link";
import { FiLock, FiArrowLeft, FiLogIn } from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FiLock size={28} className="text-red-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-sm text-zinc-500">
            You don't have permission to view this page. This area may be
            restricted to a different account type.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
         
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-sm hover:bg-zinc-800/50 transition-colors"
          >
            <FiArrowLeft size={15} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}