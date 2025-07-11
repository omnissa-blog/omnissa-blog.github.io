import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PostTagsProps {
  tags?: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="hover:bg-primary hover:text-white cursor-pointer transition-colors">
            {tag}
          </Badge>
        ))}
      </div>

      <Separator className="mb-8" />
    </div>
  );
}
