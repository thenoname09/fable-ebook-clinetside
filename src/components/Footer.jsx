import Link from "next/link";
import {  Twitter, Youtube, Send } from "lucide-react";
import { FaFacebook ,FaInstagram,FaXTwitter ,FaYoutube   } from "react-icons/fa6";
const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaXTwitter , href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube  , href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand ─────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block select-none">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">fa</span>
                <span className="text-[#c084fc]">ble</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              A digital haven for ebook lovers and emerging writers. Discover,
              read, and share original stories from around the world.
            </p>
          </div>

          {/* ── Quick Links ───────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 hover:text-[#c084fc] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social ────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:text-[#c084fc] hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Newsletter ────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Newsletter
            </h4>
            <p className="text-sm text-zinc-500">
              Get the latest ebooks and author updates in your inbox.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button
                aria-label="Subscribe"
                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-[#c084fc] to-[#818cf8] text-white hover:opacity-90 transition-opacity"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Built with ❤️ for readers &amp; writers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}