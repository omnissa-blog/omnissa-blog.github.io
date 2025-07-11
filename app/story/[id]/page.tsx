import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/server-utils";
import { PostHeader } from "@/components/post-header";
import { PostImage } from "@/components/post-image";
import { PostTags } from "@/components/post-tags";
import { Metadata } from "next";
import { AUTHORS } from "@/lib/authors";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const { metadata } = await getPost(id);
  if (!metadata) return {};
  return {
    title: metadata.title,
    description: metadata.description,
    authors: [{ name: AUTHORS[metadata.author]?.name }],
    // category: metadata.categories[0],
    // keywords: metadata.tags,
    // assets: metadata.image,
    // ...other SEO fields
  };
}

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const { content: MDXContent, metadata } = await getPost(id);

  if (!metadata) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <PostHeader metadata={metadata} />

      <PostImage src={metadata.image} alt={metadata.title} />

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-li:text-gray-700">
        <MDXContent />
      </div>

      <PostTags tags={metadata.tags} />
    </article>
  );
}
