import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
}

export function PostImage({ src, alt }: PostImageProps) {
  return (
    <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-12">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
