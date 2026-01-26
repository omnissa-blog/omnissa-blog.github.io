import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PostMetadata } from "@/types";
import { AUTHORS } from "@/lib/authors";

interface PostHeaderProps {
  metadata: PostMetadata;
}

export function PostHeader({ metadata }: PostHeaderProps) {
  const author = AUTHORS[metadata.author];
  const authorDisplayName = author?.name;
  const authorAvatar = author?.avatar;

  return (
    <div className="mb-8">
      <Badge variant="secondary" className="mb-4">
        {metadata.categories[0]}
      </Badge>
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {metadata.title}
      </h1>
      {/* <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        {metadata.description}
      </p> */}

      {/* Author Info */}
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={authorAvatar} alt={authorDisplayName} />
            <AvatarFallback>{authorDisplayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{authorDisplayName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {metadata.date && format(new Date(metadata.date + "T12:00:00"), "PPP")}
        </span>
      </div>
    </div>
  );
}
