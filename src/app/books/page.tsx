import Image from "next/image";
import Link from "next/link";
import { wpFetch } from "@/lib/wp";

type BooksData = {
  books: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt?: string;
      featuredImage?: { node: { sourceUrl: string; altText: string } } | null;
    }>;
  };
};

const QUERY = /* GraphQL */ `
  query BooksList($first: Int!) {
    books(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage { node { sourceUrl altText } }
      }
    }
  }
`;

export default async function BooksPage() {
  const data = await wpFetch<BooksData>(QUERY, { first: 24 });

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.books.nodes.map((b) => (
          <li key={b.id} className="bg-red-100 text-black rounded shadow p-4">
            <Link href={`/books/${b.slug}`} className="block hover:opacity-90">
              {b.featuredImage?.node?.sourceUrl && (
                <Image
                  src={b.featuredImage.node.sourceUrl}
                  alt={b.featuredImage.node.altText || b.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded mb-3"
                />
              )}
              <h2 className="text-xl text-black font-semibold">{b.title}</h2>
              {b.excerpt && (
                <div
                  className="prose prose-sm mt-2"
                  dangerouslySetInnerHTML={{ __html: b.excerpt }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}