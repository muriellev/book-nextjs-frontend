import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/apollo";
import { POST_BY_SLUG } from "@/lib/queries";
import { AllPostSlugsQuery } from "@/lib/__generated__/graphql";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const user = process.env.WP_PREVIEW_USER!;
  const pass = process.env.WP_PREVIEW_APP_PASSWORD!; // "appname abcd efgh ..."
  const auth = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");

  const client = getClient({ Authorization: auth });
  //const { data } = await client.query({ query: POST_BY_SLUG, variables: { slug, asPreview: true }});
  const { data } = await client.query<AllPostSlugsQuery>({ query: POST_BY_SLUG, variables: { slug, asPreview: true } });
  if (!data?.post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Next.js preview mode not required for App Router in most cases; we can just redirect
  return NextResponse.redirect(new URL(`/posts/${slug}?preview=1`, req.url));
}