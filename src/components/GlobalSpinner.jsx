"use client";

import { motion } from "motion/react";
import { Spinner } from "@heroui/react";

export default function GlobalSpinner({
  message = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen w-screen bg-black/80 backdrop-blur-md"
          : "min-h-[400px] w-full"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle Brand Glow Effect */}
        <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-xl filter animate-pulse" />

        {/* HeroUI Custom Spinner */}
        <Spinner
          size="lg"
          classNames={{
            circle1: "border-b-emerald-500",
            circle2: "border-b-emerald-400",
            wrapper: "w-14 h-14",
          }}
        />

        {/* Animated Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
          className="mt-4 text-sm font-medium tracking-wide text-zinc-300"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}