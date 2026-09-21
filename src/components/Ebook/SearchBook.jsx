"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputGroup, TextField, Label, Select, ListBox } from "@heroui/react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

const GENRES = [
  { id: "all", label: "All Genres" },
  { id: "fantasy", label: "Fantasy" },
  { id: "science-fiction", label: "Science Fiction" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "thriller", label: "Thriller" },
  { id: "horror", label: "Horror" },
  { id: "technology", label: "Technology" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
];

export default function SearchBook() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const sp = new URLSearchParams();
      if (search) sp.set("search", search);
      if (genre !== "all") sp.set("genre", genre);
      if (sort !== "newest") sp.set("sort", sort);

      // This navigation re-runs BrowseEbookPage server-side with the new searchParams
      router.push(sp.toString() ? `?${sp.toString()}` : "?", { scroll: false });
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [search, genre, sort, router]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <TextField className="flex-1 flex flex-col gap-1.5" aria-label="Search books">
        <Label className="sr-only">Search</Label>
        <InputGroup className="bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 focus-within:border-[#c084fc]/50 rounded-xl transition-colors">
          <InputGroup.Prefix>
            <FiSearch className="text-zinc-500" size={16} />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="placeholder:text-zinc-500 bg-transparent outline-none focus:outline-none focus:ring-0 focus-visible:outline-none caret-white w-full text-sm border-none shadow-none"
          />
          {search && (
            <InputGroup.Suffix>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-zinc-500 hover:text-white transition-colors p-1 hover:cursor-pointer"
              >
                <FiX size={14} />
              </button>
            </InputGroup.Suffix>
          )}
        </InputGroup>
      </TextField>

      <Select
        aria-label="Filter by genre"
        value={genre}
        onChange={(key) => setGenre(String(key))}
        className="w-full sm:w-52"
      >
        <Label className="sr-only" />
        <Select.Trigger
          className={({ isOpen }) =>
            `w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/50 border transition-colors outline-none focus:outline-none focus:ring-0 text-sm text-white ${
              isOpen ? "border-[#c084fc]/50" : "border-zinc-800/80 hover:border-zinc-700"
            }`
          }
        >
          <Select.Value className="text-zinc-200" />
          <Select.Indicator>
            <FiChevronDown size={14} className="text-zinc-500" />
          </Select.Indicator>
        </Select.Trigger>
        <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-xl z-50">
          <ListBox className="outline-none max-h-64 overflow-y-auto">
            {GENRES.map(({ id, label }) => (
              <ListBox.Item
                key={id}
                id={id}
                textValue={label}
                className="text-zinc-300 text-sm px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-800 hover:text-white outline-none data-[focused=true]:bg-zinc-800 data-[selected=true]:bg-purple-500/15 data-[selected=true]:text-purple-300 flex items-center justify-between transition-colors"
              >
                <Label>{label}</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        aria-label="Sort books"
        value={sort}
        onChange={(key) => setSort(String(key))}
        className="w-full sm:w-52"
      >
        <Label className="sr-only" />
        <Select.Trigger
          className={({ isOpen }) =>
            `w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/50 border transition-colors outline-none focus:outline-none focus:ring-0 text-sm text-white ${
              isOpen ? "border-[#c084fc]/50" : "border-zinc-800/80 hover:border-zinc-700"
            }`
          }
        >
          <Select.Value className="text-zinc-200" />
          <Select.Indicator>
            <FiChevronDown size={14} className="text-zinc-500" />
          </Select.Indicator>
        </Select.Trigger>
        <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-xl z-50">
          <ListBox className="outline-none">
            {SORT_OPTIONS.map(({ id, label }) => (
              <ListBox.Item
                key={id}
                id={id}
                textValue={label}
                className="text-zinc-300 text-sm px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-800 hover:text-white outline-none data-[focused=true]:bg-zinc-800 data-[selected=true]:bg-purple-500/15 data-[selected=true]:text-purple-300 flex items-center justify-between transition-colors"
              >
                <Label>{label}</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}