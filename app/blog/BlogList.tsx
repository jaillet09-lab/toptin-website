"use client";

import { useState } from "react";
import { PostGrid } from "@/components/PostCards";
import type { PostSummary } from "@/lib/blog-shared";

const categories = [
  { key: "all", label: "All" },
  { key: "costs", label: "Costs and quotes" },
  { key: "replacement", label: "Roof replacement" },
  { key: "colorbond", label: "Colorbond" },
  { key: "safety", label: "Safety and insurance" },
];

/** Category filter. Every post is in the server HTML; filtering only hides cards. */
export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [cat, setCat] = useState("all");
  const shown = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter guides by category">
        {categories.filter((c) => c.key === "all" || posts.some((p) => p.category === c.key)).map((c) => (
          <button key={c.key} type="button" onClick={() => setCat(c.key)} aria-pressed={cat === c.key}
            className={`min-h-11 rounded-full px-4 text-[14.5px] font-semibold transition-colors ${cat === c.key ? "bg-navy text-white" : "border border-line bg-white text-navy hover:border-navy"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <PostGrid posts={shown} />
    </>
  );
}
