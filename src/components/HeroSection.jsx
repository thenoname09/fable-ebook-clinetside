"use client";


import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import NumberCountUp from "./HeroSection/NumberCountUp";
import { motion, useSpring } from "motion/react";

// ── floating book cards data ──────────────────────────────────────────────────
const FLOAT_CARDS = [
  {
    title: "The Lost Meridian",
    genre: "Sci-Fi",
    color: "#c084fc",
    top: "8%",
    left: "4%",
    delay: "0s",
    rotate: "-6deg",
  },
  {
    title: "Ember & Ash",
    genre: "Fantasy",
    color: "#818cf8",
    top: "55%",
    left: "2%",
    delay: "0.6s",
    rotate: "5deg",
  },
  {
    title: "Neon Requiem",
    genre: "Mystery",
    color: "#f472b6",
    top: "20%",
    right: "3%",
    delay: "0.3s",
    rotate: "7deg",
  },
  {
    title: "Salt & Starlight",
    genre: "Romance",
    color: "#34d399",
    top: "62%",
    right: "2%",
    delay: "1s",
    rotate: "-4deg",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808] px-4 pt-24 pb-16">
      {/* ── Background glow blobs ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-pink-600/6 blur-[100px]" />
      </div>

      {/* ── Subtle grid overlay ───────────────────────────────── */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      /> */}

      {/* ── Floating book cards (desktop only) ───────────────── */}
      {FLOAT_CARDS.map((card) => (
        <motion.div
          key={card.title}
          className="hidden lg:flex pointer-events-none absolute flex-col gap-1 px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm shadow-lg w-36"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            rotate: card.rotate,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: parseFloat(card.delay),
          }}
        >
          <div
            className="w-full h-20 rounded-md opacity-80"
            style={{
              background: `linear-gradient(135deg, ${card.color}33, ${card.color}11)`,
              border: `1px solid ${card.color}30`,
            }}
          >
            <div className="flex items-end justify-end h-full p-1.5">
              <BookOpen size={14} style={{ color: card.color }} />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-white leading-tight truncate">
            {card.title}
          </p>
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full w-fit"
            style={{ background: `${card.color}20`, color: card.color }}
          >
            {card.genre}
          </span>
        </motion.div>
      ))}

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
        {/* badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium">
          <Sparkles size={12} />
          Original ebooks by real writers
        </div>

        {/* headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
          Discover &amp; Read{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#c084fc] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
              Original Ebooks
            </span>
            {/* underline squiggle */}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q37.5 0 75 4 Q112.5 8 150 4 Q187.5 0 225 4 Q262.5 8 300 4"
                stroke="url(#squiggle)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="squiggle"
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#c084fc" />
                  <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* subheading */}
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
          A home for independent writers and curious readers. Browse thousands
          of hand-crafted ebooks across every genre — no subscription required.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/browse"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-95 transition-all duration-200"
          >
            Browse Ebooks
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all duration-200"
          >
            Start Writing
          </Link>
        </div>

        {/* stats row */}
        <div className="flex items-center gap-6 sm:gap-10 mt-4 pt-6 border-t border-zinc-800/60">
          <NumberCountUp></NumberCountUp>
        </div>
      </div>

      {/* ── Bottom fade ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />

      {/* ── Float keyframes ───────────────────────────────────── */}
      {/* <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
          50%       { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style> */}
    </section>
  );
}
