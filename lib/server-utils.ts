import { PostMetadata } from "@/types";
import fs from "fs";
import path from "path";

/**
 * Content model:
 * - slug.mdx → main post (standalone)
 * - slug/index.mdx → main post (folder-based, can have subpages)
 * - slug/subpage.mdx → subpage (excluded from getAllPosts listing; only in getAllPostSlugs)
 */

function isModuleNotFound(err: unknown): boolean {
  const code = (err as NodeJS.ErrnoException)?.code;
  const msg = String((err as Error)?.message ?? "");
  return code === "MODULE_NOT_FOUND" || code === "ERR_MODULE_NOT_FOUND" || msg.includes("Cannot find module");
}

export async function getPost(slug: string) {
  try {
    const { default: content, metadata } = (await import(
      `@/app/_posts/${slug}.mdx`
    )) as { default: any; metadata: PostMetadata };
    return { content, metadata };
  } catch (err) {
    if (!isModuleNotFound(err)) throw err;
    try {
      const { default: content, metadata } = (await import(
        `@/app/_posts/${slug}/index.mdx`
      )) as { default: any; metadata: PostMetadata };
      return { content, metadata };
    } catch (err2) {
      if (!isModuleNotFound(err2)) throw err2;
      return { content: null, metadata: null };
    }
  }
}

/** Returns main posts only (for feed/listing). Excludes subpages. */
export async function getAllPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), "app/_posts"));
  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
  const dirSlugs = files.filter(
    (f) =>
      fs.statSync(path.join(process.cwd(), "app/_posts", f)).isDirectory() &&
      fs.existsSync(path.join(process.cwd(), "app/_posts", f, "index.mdx"))
  );
  const posts = await Promise.all(
    [...slugs, ...dirSlugs].map(async (slug) => {
      const { metadata } = await getPost(slug);
      return metadata ? { slug, metadata } : null;
    })
  );
  return posts
    .filter((p): p is { slug: string; metadata: PostMetadata } => p !== null && !p.metadata.hidden)
    .sort((p1, p2) => new Date(p2.metadata.date).getTime() - new Date(p1.metadata.date).getTime());
}

/** Returns all slugs for static generation: main posts + subpages. */
export function getAllPostSlugs() {
  const files = fs.readdirSync(path.join(process.cwd(), "app/_posts"));
  const main = files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
  const dirs = files.filter(
    (f) =>
      fs.statSync(path.join(process.cwd(), "app/_posts", f)).isDirectory() &&
      fs.existsSync(path.join(process.cwd(), "app/_posts", f, "index.mdx"))
  );
  main.push(...dirs);
  const subpages = dirs.flatMap((d) =>
    fs
      .readdirSync(path.join(process.cwd(), "app/_posts", d))
      .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
      .map((f) => ({ id: d, subpage: f.replace(".mdx", "") }))
  );
  return { main, subpages };
}
