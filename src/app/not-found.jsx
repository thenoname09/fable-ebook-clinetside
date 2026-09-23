import Link from "next/link";
import { FiBookOpen, FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* ambient glow, matches the hero/login pattern used elsewhere */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <FiBookOpen size={36} className="text-purple-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-white">Page not found</h2>
          <p className="text-sm text-zinc-500">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <FiArrowLeft size={15} />
            Back to Home
          </Link>
          <Link
            href="/browse"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-sm hover:bg-zinc-800/50 transition-colors"
          >
            <FiSearch size={15} />
            Browse Ebooks
          </Link>
        </div>
      </div>
    </div>
  );
}