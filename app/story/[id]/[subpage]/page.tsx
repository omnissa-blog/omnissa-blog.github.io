import { notFound } from "next/navigation";
import { getAllPostSlugs, getPost } from "@/lib/server-utils";
import { PostHeader } from "@/components/post-header";
import { PostImage } from "@/components/post-image";
import { PostTags } from "@/components/post-tags";
import { Metadata } from "next";
import { AUTHORS } from "@/lib/authors";

export async function generateStaticParams() {
  const { subpages } = getAllPostSlugs();
  return subpages.map(({ id, subpage }) => ({
    id,
    subpage,
  }));
}

export async function generateMetadata({
  params,
}: StorySubpageProps): Promise<Metadata> {
  const { id, subpage } = await params;
  const slug = `${id}/${subpage}`;
  const { metadata } = await getPost(slug);
  if (!metadata) return {};
  return {
    title: metadata.title,
    description: metadata.description,
    authors: [{ name: AUTHORS[metadata.author]?.name }],
  };
}

interface StorySubpageProps {
  params: Promise<{
    id: string;
    subpage: string;
  }>;
}

export default async function StorySubpage({ params }: StorySubpageProps) {
  const { id, subpage } = await params;
  const slug = `${id}/${subpage}`;
  const { content: MDXContent, metadata } = await getPost(slug);

  if (!metadata) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <PostHeader metadata={metadata} />

      <PostImage src={metadata.image} alt={metadata.title} />

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-li:text-gray-700">
        <MDXContent />
      </div>

      <PostTags tags={metadata.tags} />
    </article>
  );
}
