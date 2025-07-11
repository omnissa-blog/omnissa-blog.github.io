import Link from "next/link";
import { PostMetadata } from "@/types";
import { PostCard } from "./post-card";

export function FeaturedArticles({
  posts,
}: {
  posts: { slug: string; metadata: PostMetadata }[];
}) {
  const hasMagazineLayout = (idx: number) => {
    if (idx === 0) {
      return true; // First post always has magazine layout
    }
    if (idx === posts.length - 1 && (idx + 1) % 2 === 0) {
      return true; // Last even post also has magazine layout
    }
    return false; // All other posts have vertical layout
  };
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Stories</h2>
        <Link
          href="/stories"
          className="text-primary hover:text-primary/80 font-medium"
        >
          See all
        </Link>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-x-8 gap-y-12">
        {posts.map((post, idx) => (
          <PostCard
            key={post.slug}
            post={post}
            style={{
              flexBasis: hasMagazineLayout(idx) ? "100%" : "calc(50% - 1rem)",
            }}
            variant={hasMagazineLayout(idx) ? "magazine" : "vertical"}
          />
        ))}
      </div>
    </section>
  );
}
