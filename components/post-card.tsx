import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PostMetadata } from "@/types";
import { AUTHORS } from "@/lib/authors";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: { slug: string; metadata: PostMetadata };
  variant?: "horizontal" | "vertical" | "magazine";
  [key: string]: any; // For additional props like className
}

export function PostCard({
  post,
  variant = "horizontal",
  ...otherProps
}: PostCardProps) {
  const author = AUTHORS[post.metadata.author];
  const authorDisplayName = author?.name || post.metadata.author;
  const authorAvatar = author?.avatar;

  // Common components
  const AuthorInfo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center space-x-2", className)}>
      <Avatar className={cn(variant === "magazine" ? "h-8 w-8" : "h-6 w-6")}>
        <AvatarImage src={authorAvatar} alt={authorDisplayName} />
        <AvatarFallback
          className={cn(variant === "magazine" ? "text-sm" : "text-xs")}
        >
          {authorDisplayName[0]}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{authorDisplayName}</span>
    </div>
  );

  const Categories = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center space-x-2", className)}>
      {post.metadata.categories?.map((category) => (
        <Badge variant="secondary" className="text-xs" key={category}>
          {category}
        </Badge>
      ))}
    </div>
  );

  const PostImage = ({ className }: { className?: string }) => (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden group cursor-pointer",
        className
      )}
    >
      <Image
        src={post.metadata.image}
        alt={post.metadata.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );

  const PostContent = ({
    titleClassName,
    descClassName,
  }: {
    titleClassName?: string;
    descClassName?: string;
  }) => (
    <div className="group cursor-pointer">
      <h3
        className={cn(
          "font-serif font-bold group-hover:text-primary transition-colors line-clamp-2",
          titleClassName
        )}
      >
        {post.metadata.title}
      </h3>
      <p className={cn("text-gray-600 line-clamp-2", descClassName)}>
        {post.metadata.description}
      </p>
    </div>
  );

  const DateInfo = ({ className }: { className?: string }) => (
    <span className={cn("text-sm text-gray-500", className)}>
      {post.metadata.date && format(new Date(post.metadata.date), "PPP")}
    </span>
  );

  // Horizontal layout
  if (variant === "horizontal") {
    return (
      <Link href={`/story/${post.slug}`} className="bg-card p-4 rounded-2xl">
        <div className="group cursor-pointer grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="flex items-center space-x-4 mb-3">
              <AuthorInfo />
              <DateInfo />
            </div>
            <PostContent
              titleClassName="text-xl md:text-2xl mb-2"
              descClassName="mb-4 text-sm md:text-base"
            />
            <Categories />
          </div>
          <div className="md:col-span-1 grid items-center">
            <PostImage className="h-32 md:h-24" />
          </div>
        </div>
      </Link>
    );
  }

  // Vertical layout
  if (variant === "vertical") {
    return (
      <Link
        href={`/story/${post.slug}`}
        {...otherProps}
        className={cn("bg-card p-4 rounded-2xl", otherProps.className)}
      >
        <div className="group cursor-pointer">
          <PostImage className="h-48 mb-4" />
          <Categories className="mb-2" />
          <PostContent
            titleClassName="text-xl font-semibold mb-2"
            descClassName="mb-4"
          />
          <div className="flex items-center space-x-4 text-sm">
            <AuthorInfo />
            <DateInfo />
          </div>
        </div>
      </Link>
    );
  }

  // Magazine layout
  if (variant === "magazine") {
    return (
      <Link
        href={`/story/${post.slug}`}
        {...otherProps}
        className={cn("bg-card p-4 rounded-2xl", otherProps.className)}
      >
        <div className="group cursor-pointer">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Categories className="mb-3" />
              <PostContent
                titleClassName="text-3xl mb-4"
                descClassName="mb-6 text-lg leading-relaxed"
              />
              <div className="flex items-center space-x-4">
                <AuthorInfo />
                <DateInfo />
              </div>
            </div>
            <PostImage className="h-72 md:h-80" />
          </div>
        </div>
      </Link>
    );
  }

  return null;
}
