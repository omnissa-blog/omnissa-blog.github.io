import { BlogList } from "@/components/blog-list";
import { FeaturedArticles } from "@/components/featured-articles";
import { getAllPosts } from "@/lib/server-utils";

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.filter((post) => post.metadata.featured);

  return (
    <main>
      {/* <Hero /> */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:col-span-2">
            <FeaturedArticles posts={featuredPosts} />
            <div className="mt-12">
              <BlogList posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
