import { getClient } from "@/lib/apollo";
import { ALL_POST_SLUGS, POST_BY_SLUG } from "@/lib/queries";
import { AllPostSlugsQuery } from "@/lib/__generated__/graphql";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const client = getClient();
  //const { data } = await client.query({ query: ALL_POST_SLUGS });
  const { data } = await client.query<AllPostSlugsQuery>({ query: ALL_POST_SLUGS });
  return (data?.posts?.nodes ?? []).map((n: any) => ({ slug: n.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query: POST_BY_SLUG,
    variables: { slug: params.slug },
  });
  const post = data?.post;
  if (!post) return notFound();

  return (
    <article className="prose mx-auto p-6">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}