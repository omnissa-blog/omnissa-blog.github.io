export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  featured?: boolean;
  hidden?: boolean;
  author: string; // Author ID that maps to AUTHORS
  image: string;
  tags: string[];
  categories: string[];
};