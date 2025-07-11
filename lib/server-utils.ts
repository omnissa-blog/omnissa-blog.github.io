import { PostMetadata } from "@/types";
import fs from "fs";
import path from "path";

export async function getPost(slug: string) {
  const { default: content, metadata } = (await import(
    `@/app/_posts/${slug}.mdx`
  )) as { default: any; metadata: PostMetadata };
  return { content, metadata };
}

export async function getAllPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), "app/_posts"));
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(".mdx", "");
        const { metadata } = await getPost(slug);
        return { slug, metadata };
      })
  );
  return posts.filter((post) => !post.metadata.hidden).sort((p1, p2) => new Date(p2.metadata.date).getTime() - new Date(p1.metadata.date).getTime());
}
