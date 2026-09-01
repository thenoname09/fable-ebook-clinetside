"use client";

import { motion } from "motion/react";
import { Spinner } from "@heroui/react";

export default function GlobalSpinner({
  message = "Loading...",
  subtitle = "",
  fullScreen = true,
  color = "purple",
  size = "lg",
}) {
  const colorMap = {
    emerald: {
      glow: "bg-emerald-500/20",
      spinner1: "border-b-emerald-500",
      spinner2: "border-b-emerald-400",
      text: "text-emerald-400",
    },
    purple: {
      glow: "bg-purple-500/20",
      spinner1: "border-b-purple-500",
      spinner2: "border-b-purple-400",
      text: "text-purple-400",
    },
    blue: {
      glow: "bg-blue-500/20",
      spinner1: "border-b-blue-500",
      spinner2: "border-b-blue-400",
      text: "text-blue-400",
    },
  };

  const colorScheme = colorMap[color] || colorMap.emerald;

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen w-screen bg-black/80 backdrop-blur-md"
          : "min-h-[400px] w-full"
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Animated Glow Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -inset-4 rounded-full ${colorScheme.glow} blur-xl filter`}
        />

        {/* Spinner Container */}
        <div className="relative z-10">
          <Spinner
            size={size}
            classNames={{
              circle1: colorScheme.spinner1,
              circle2: colorScheme.spinner2,
              wrapper: "w-14 h-14",
            }}
          />
        </div>

        {/* Main Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-base font-semibold text-zinc-100 tracking-tight"
        >
          {message}
        </motion.p>

        {/* Optional Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-2 text-xs font-medium text-zinc-500"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Animated Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-4 flex gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`w-1.5 h-1.5 rounded-full ${colorScheme.text}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}