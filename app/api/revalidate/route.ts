import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath } from "next/cache";
import { SanityDocument } from "@sanity/types";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const { body, isValidSignature } = await parseBody(
      rawBody,
      req.headers,
      process.env.SANITY_REVALIDATE_SECRET!
    );

    if (isValidSignature === false) {
      const message = "Invalid signature";
      console.log(message);
      return NextResponse.json({ message }, { status: 401 });
    }

    const sanityBody = body as SanityDocument & {
      slug: { current: string };
    };

    if (
      typeof sanityBody.slug.current !== "string" ||
      !sanityBody.slug.current
    ) {
      const invalidSlug = "Invalid slug";
      console.error(invalidSlug, { sanityBody });
      return NextResponse.json(
        { message: invalidSlug },
        { status: 400 }
      );
    }

    const staleRoutes = [`/post/${sanityBody.slug.current}`, "/"];

    await Promise.all(
      staleRoutes.map(route => revalidatePath(route))
    );

    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    console.log(updatedRoutes);
    return NextResponse.json(
      { message: updatedRoutes },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
