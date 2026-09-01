"use client";

import { motion } from "motion/react";
import { Spinner } from "@heroui/react";

export default function GlobalSpinner({
  message = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-6 ${
        fullScreen
          ? "fixed inset-0 z-[999] min-h-screen w-screen bg-black/60 backdrop-blur-sm"
          : "min-h-[400px] w-full"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Centered Brand Glow Effect */}
        <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-full rounded-full bg-purple-500/20 blur-xl filter animate-pulse" />

        {/* HeroUI Custom Spinner */}
        <Spinner
          size="lg"
          classNames={{
            circle1: "border-b-purple-500",
            circle2: "border-b-purple-400",
            wrapper: "w-14 h-14 relative z-10",
          }}
        />

        {/* Smoother Animated Loading Text */}
        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="mt-5 text-sm font-medium tracking-wide text-zinc-300 relative z-10"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}