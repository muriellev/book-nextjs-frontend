import { wpFetch } from "@/lib/wp";

type PostData = {
  post: {
    title: string;
    content?: string;
    featuredImage?: { node: { sourceUrl: string; altText: string } } | null;
    genres?: { nodes: Array<{ name: string; slug: string }> } | null;
    // example meta if you registered it with show_in_rest + graphql:
    authorName?: string; // you can expose via WPGraphQL Meta or ACF
  } | null;
};

export const POST_BY_SLUG = `
  query PostBySlug($slug: ID!, $asPreview: Boolean = false) {
    post(id: $slug, idType: SLUG, asPreview: $asPreview) {
      title
      content
      date
      featuredImage { node { sourceUrl altText } }
      #seo: seo { title metaDesc } # if using Yoast + WPGraphQL SEO
    }
  }
`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await wpFetch<PostData>(POST_BY_SLUG, { slug: params.slug });
  const b = data.post;
  if (!b) return <div className="p-6">Not found.</div>;

  return (
    <article className="main-container container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1>{b.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: b.content ?? "" }} />
    </article>
  );
}