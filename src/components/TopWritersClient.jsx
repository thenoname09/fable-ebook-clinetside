"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

const getInitials = (name) => {
  if (!name) return "W";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const TopWritersClient = ({ writers }) => {
  if (writers.length === 0) return null;

  return (
    <section className="relative px-4 md:px-8 max-w-7xl mx-auto py-16  overflow-hidden">
      {/* ADDED — ambient background glow, consistent with hero section */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[130px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Our Top Writers
        </h2>
        <p className="text-zinc-400 text-sm">
          The creative minds behind our best-selling ebooks.
        </p>
      </motion.div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto ${
          writers.length < 3 ? "sm:max-w-2xl" : "max-w-4xl"
        }`}
      >
        {writers.map((writer, index) => (
          <motion.div
            key={writer.writerId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative bg-gradient-to-b from-zinc-900/60 to-[#0f0f0f] border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 rounded-3xl p-6 flex flex-col items-center text-center group shadow-xl"
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30 z-10">
              #{index + 1}
            </div>

            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-zinc-900 group-hover:border-purple-500/30 transition-colors bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center">
              {writer.image ? (
                <Image
                  src={writer.image}
                  alt={writer.writerName}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-2xl font-bold text-purple-300">
                  {getInitials(writer.writerName)}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {writer.writerName}
            </h3>
            <p className="text-zinc-500 text-xs mb-4">Verified Author</p>

            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full">
              <FiTrendingUp size={16} />
              {writer.totalSales} Sales
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopWritersClient;