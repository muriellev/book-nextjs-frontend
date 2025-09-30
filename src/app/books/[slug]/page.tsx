import Image from "next/image";
import { wpFetch } from "@/lib/wp";

type BookData = {
  book: {
    title: string;
    content?: string;
    featuredImage?: { node: { sourceUrl: string; altText: string } } | null;
    genres?: { nodes: Array<{ name: string; slug: string }> } | null;
    // example meta if you registered it with show_in_rest + graphql:
    authorName?: string; // you can expose via WPGraphQL Meta or ACF
  } | null;
};

const BOOK_QUERY = /* GraphQL */ `
  query BookBySlug($slug: ID!) {
    book(id: $slug, idType: SLUG) {
      title
      content
      featuredImage { node { sourceUrl altText } }
      genres { nodes { name slug } }
      # example if using WPGraphQL for Advanced Custom Fields or meta:
      # authorName: customFieldResolver
    }
  }
`;

export default async function BookPage({ params }: { params: { slug: string } }) {
  const data = await wpFetch<BookData>(BOOK_QUERY, { slug: params.slug });
  const b = data.book;
  if (!b) return <div className="p-6">Not found.</div>;

  return (
    <main className="main-container container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{b.title}</h1>

      {b.featuredImage?.node?.sourceUrl && (
        <Image
          src={b.featuredImage.node.sourceUrl}
          alt={b.featuredImage.node.altText || b.title}
          width={300}
          height={600}
          className="rounded mb-6"
        />
      )}

      <div className="text-sm text-slate-500 mb-4">
        {b.genres?.nodes?.length ? (
          <>Genres: {b.genres.nodes.map((g) => g.name).join(", ")}</>
        ) : null}
      </div>

      {b.content && (
        <article
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: b.content }}
        />
      )}
    </main>
  );
}