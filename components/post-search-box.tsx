"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostMetadata } from "@/types";
import { getAllPosts } from "@/lib/server-utils";

interface PostSearchResult {
  slug: string;
  metadata: PostMetadata;
}

export default function PostSearchBox({ posts: allPosts }: { posts: any[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.metadata.title.toLowerCase().includes(q) ||
        post.metadata.description.toLowerCase().includes(q) ||
        post.metadata.tags?.some((tag: string) => tag.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 8));
    setShowDropdown(filtered.length > 0);
  }, [query, allPosts]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showDropdown]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="pl-10 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 w-full rounded-md py-2 px-3 text-sm"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(results.length > 0)}
        autoComplete="off"
      />
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No results found.</div>
          ) : (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/story/${post.slug}`}
                className="block px-4 py-3 hover:bg-primary/10 transition-colors border-b last:border-b-0 border-gray-100"
                onClick={() => {
                  setShowDropdown(false);
                  setQuery("");
                }}
              >
                <div className="font-medium text-gray-900 line-clamp-1">
                  {post.metadata.title}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1">
                  {post.metadata.description}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {post.metadata.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
