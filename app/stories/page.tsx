import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/server-utils";

export default async function StoriesPage() {
  const posts = await getAllPosts();
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-bold mb-4">All Stories</h1>
          <p className="text-gray-600 text-lg">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
        <BlogList posts={posts} />
      </div>
    </main>
  );
}
