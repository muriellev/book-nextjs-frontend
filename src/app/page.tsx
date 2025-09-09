import { getClient } from "@/lib/apollo";
import { HOMEPAGE_POSTS } from "@/lib/queries";
export const revalidate = 60; // ISR

export default async function HomePage() {
  const client = getClient();
  const { data } = await client.query({ query: HOMEPAGE_POSTS });
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="prose mx-auto p-6">
      <h1>Blog</h1>
      <ul>
        {posts.map((p: any) => (
          <li key={p.slug}>
            <a href={`/posts/${p.slug}`}>{p.title}</a>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
          </li>
        ))}
      </ul>
    </main>
  );
}