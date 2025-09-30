import FeaturedBooks from "./components/FeaturedBooks";
import { wpFetch } from "@/lib/wp";
import Link from "next/link";
export const revalidate = 60; // ISR

type PostsData = {
  posts: {
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
query HomeBooks {
  posts(first: 100, where: { status: PUBLISH }) {
    nodes { slug title date excerpt }
  }
}
`;

export default async function HomePage() {
  // const client = getClient();
  // const { data } = await client.query({ query: HOMEPAGE_POSTS });
  // const posts = data?.posts?.nodes ?? [];

  const data = await wpFetch<PostsData>(QUERY, { first: 3 });
  const posts = data.posts.nodes;

  return (
    <main className="main-container container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="featured-blogs">
        <h1 className="text-3xl font-bold mb-6">Featured Blog</h1>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: any) => (
            <li key={p.slug} className="text-black rounded shadow p-4">
              <Link href={`/posts/${p.slug}`} className="block hover:opacity-90">{p.title}</Link>
              <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
            </li>
          ))}
        </ul>
      </div>

      <FeaturedBooks></FeaturedBooks>
    </main>
  );
}