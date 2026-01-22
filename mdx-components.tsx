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
      <ul className="list-disc list-outside my-4 ml-8">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside my-4 text-xl ml-8">{children}</ol>
    ),
    li: ({ children }) => <li className="my-2 text-xl pl-2 [&>p]:my-0">{children}</li>,
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
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
        {children}
      </td>
    ),
    ...components,
  };
}
