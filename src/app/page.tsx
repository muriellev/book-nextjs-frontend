import { getClient } from "@/lib/apollo";
import { HOMEPAGE_POSTS } from "@/lib/queries";
import { HOMEPAGE_BOOKS } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
export const revalidate = 60; // ISR

export default async function HomePage() {
  const client = getClient();
  const { data } = await client.query({ query: HOMEPAGE_POSTS });
  console.log(HOMEPAGE_POSTS);
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="prose mx-auto p-6">
      <h1>Blog</h1>
      <ul>
        {posts.map((p: any) => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
          </li>
        ))}
      </ul>
    </main>
  );
}