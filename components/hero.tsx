import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-linear-to-br from-primary/5 to-primary/10 border-b">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Human stories & ideas
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A place to read, write, and deepen your understanding of the world.
            Share your thoughts and connect with a community of curious minds.
          </p>
          <Link href="/write">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full"
            >
              Start writing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
