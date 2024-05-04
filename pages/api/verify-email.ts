import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/utils/dbconnect';
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await dbConnect();
    const { token, redirectUrl } = req.query;

    try {
      const user = await User.findOne({ emailVerificationToken: token });

      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired verification token." });
      }

      user.emailVerificationToken = undefined;
      user.isEmailVerified = true;
      await user.save();

      // Redirect to the specified URL after successful verification
      const decodedRedirectUrl = decodeURIComponent(redirectUrl as string);
      return res.status(200).json({ success: true, message: "Email verified successfully.", redirectUrl: decodedRedirectUrl });
    } catch (error) {
      console.error("Email verification error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}