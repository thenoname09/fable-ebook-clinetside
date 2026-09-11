"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const FeaturedEbooksClient = ({ books }) => {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
      {/* 1. FRAMER MOTION ANIMATED HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">Featured Ebooks</h2>
          <p className="text-zinc-400 mt-1 text-sm">
      Explore our most popular and newly released ebooks.
          </p>
        </div>
        <Link
          href="/browse"
          className="hidden sm:flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All <FiArrowRight size={14} />
        </Link>
      </motion.div>

      {/* 2. REACT-FAST-MARQUEE WITH CUSTOM CARDS & SCROLLBAR FIX */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Marquee 
          pauseOnHover={true} 
          speed={40} 
          gradient={true}
          gradientColor="#080808"
          className="py-4 overflow-y-hidden" 
        >
          <div className="flex gap-5 pr-5 pb-2 overflow-y-hidden no-scrollbar">
            {books.map((book) => (
              <Link
                key={book._id}
                href={`/browse/${book._id}`}
                className="group block w-[160px] sm:w-[200px] bg-[#0f0f0f] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors shrink-0"
              >
                <div className="relative w-full aspect-[2/3] bg-zinc-900">
                  <Image
                    src={book.coverImage || "/placeholder-image.jpg"}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    Published{' '}
                    {book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }) : "Recently"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Marquee>
      </motion.div>

      {/* MOBILE VIEW ALL BUTTON */}
      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All Ebooks <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedEbooksClient;