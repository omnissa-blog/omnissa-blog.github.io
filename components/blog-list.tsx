"use client";

import { BlogPostCard } from "@/components/blog-post-card";
import { PostMetadata } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function BlogList({
  posts,
}: {
  posts: { slug: string; metadata: PostMetadata }[];
}) {
  // Get all unique categories
  const categories = [
    "All",
    ...Array.from(new Set(posts.flatMap((post) => post.metadata.categories))),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts by selected category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.metadata.categories.includes(selectedCategory)
        );

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Latest Stories</h2>
      </div>

      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="mb-8"
      >
        <TabsList className="flex flex-wrap gap-2 h-auto p-1 bg-transparent mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-full cursor-pointer px-4 py-2 text-sm font-medium border border-gray-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary hover:bg-gray-50 transition-colors"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory}>
          <div className="flex flex-col space-y-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
