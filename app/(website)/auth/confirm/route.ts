// auth/confirm/route.ts

import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      const responseText = "The verification token you provided is either invalid or has expired.";
      return new NextResponse(responseText, { status: 400 });
    }

    user.emailVerificationToken = undefined;
    user.isEmailVerified = true;
    await user.save();

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, req.url)
    );
  } catch (error) {
    console.error("Email verification error:", error);
    const responseText = "An error occurred while verifying your email. Please try again later.";
    return new NextResponse(responseText, { status: 500 });
  }
}