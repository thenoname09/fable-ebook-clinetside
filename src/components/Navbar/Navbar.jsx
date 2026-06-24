"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Ebooks", href: "/browse" },
];

export default function Navbar() {
   const router = useRouter();
  const pathname = usePathname();
  const { data: session, error } = authClient.useSession();
  console.log(session);
  const user = session?.user;


  const logout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  const dashboardHref =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "writer"
        ? "/dashboard/writer"
        : "/dashboard/user";

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg shadow-black/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link href="/" className="select-none">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">fa</span>
              <span className="text-[#c084fc]">ble</span>
            </span>
          </Link>

          {/* ── Desktop Links ─────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(href)
                      ? "text-[#c084fc]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#c084fc]" />
                  )}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <Link
                  href={dashboardHref}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    pathname.startsWith("/dashboard")
                      ? "text-[#c084fc]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Dashboard
                  {pathname.startsWith("/dashboard") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#c084fc]" />
                  )}
                </Link>
              </li>
            )}
          </ul>

          {/* ── Desktop Auth ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 hover:bg-zinc-800/80 transition-all duration-200"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#c084fc] to-[#818cf8] text-white text-xs font-semibold">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  <span className="text-sm text-zinc-200 font-medium max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-[#141414] shadow-xl shadow-black/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-800">
                      <p className="text-xs text-zinc-500">Signed in as</p>
                      <p className="text-sm text-white font-medium truncate">
                        {user.name}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="block px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                      onClick={() => setDropOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-800/60 transition-colors border-t border-zinc-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-md shadow-purple-500/25 hover:opacity-90 transition-opacity duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-md shadow-purple-500/25 hover:opacity-90 transition-opacity duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-zinc-800 bg-[#141414]/95 backdrop-blur-md shadow-xl shadow-black/50 overflow-hidden">
            <ul className="px-2 py-2 space-y-0.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(href)
                        ? "text-[#c084fc] bg-purple-500/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                    }`}
                  >
                    {isActive(href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                    )}
                    {label}
                  </Link>
                </li>
              ))}

              {user && (
                <li>
                  <Link
                    href={dashboardHref}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith("/dashboard")
                        ? "text-[#c084fc] bg-purple-500/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className="px-4 py-3 border-t border-zinc-800">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#c084fc] to-[#818cf8] text-white text-xs font-semibold shrink-0">
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                    <div>
                      <p className="text-sm text-white font-medium">
                        {user.name}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block text-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-md shadow-purple-500/25"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
