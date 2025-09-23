import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  // const secret = req.nextUrl.searchParams.get("secret");
  const form = await req.formData();
  const secret = form.get("secret");
  console.log('secret');
  console.log(secret);
  if (secret !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });

  // const body = await req.json().catch(() => ({}));
  // const slug = body?.slug || body?.post_slug;
  const slug = form.get("slug");

  // Revalidate the home and the specific post path if present
  try {
    // await Promise.all([
    //   // @ts-ignore
    //   (res => res)(await (global as any).revalidatePath?.("/") || true),
    //   slug ? (global as any).revalidatePath?.(`/posts/${slug}`) : Promise.resolve(true),
    // ]);
    revalidatePath(`/${slug}`);

  } catch (e) {
    // If using Next 14/15: revalidatePath is available in Server Actions; fallback approach:
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}