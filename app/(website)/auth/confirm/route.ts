import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const user = await User.findOne({
      emailVerificationToken: token
    });

    if (!user) {
      return new NextResponse(
        `The verification token you provided is either invalid or has expired.
      `,
        { status: 400 }
      );
    }

    user.emailVerificationToken = undefined;
    user.isEmailVerified = true;
    await user.save();

    return NextResponse.redirect(new URL("/auth/login", req.url));
  } catch (error) {
    console.error("Email verification error:", error);
    return new NextResponse(
      `
        An error occurred while verifying your email. Please try again later.
      `,
      { status: 500 }
    );
  }
}
