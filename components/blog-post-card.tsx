import { PostMetadata } from "@/types";
import { PostCard } from "./post-card";

interface BlogPostCardProps {
  post: { slug: string; metadata: PostMetadata };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return <PostCard post={post} variant="horizontal" />;
}
