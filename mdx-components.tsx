import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl font-bold my-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl font-bold my-4">{children}</h3>
    ),
    p: ({ children }) => <p className="my-4 text-xl">{children}</p>,
    a: ({ children, href }) => (
      <a href={href} className="text-primary hover:text-secondary">
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <img src={src} alt={alt} className="my-10 rounded-lg" />
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-4 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-4 text-xl ml-4">{children}</ol>
    ),
    li: ({ children }) => <li className="my-4 text-xl">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono bg-gray-800 text-white p-1 rounded text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-6">
        {children}
      </pre>
    ),
    ...components,
  };
}
