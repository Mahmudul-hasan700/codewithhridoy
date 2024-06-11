import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";

const CLIENT_ID =
  "394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { code } = req.query;

    if (!code) {
      return res
        .status(400)
        .json({ error: "Missing authorization code" });
    }

    try {
      const { tokens } = await OAuth2Client.getToken(code);
      OAuth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: OAuth2Client,
        version: "v2"
      });

      const { data } = await oauth2.userinfo.get();
      const { email, name, picture } = data;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        if (existingUser.provider === "google") {
          const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d"
            }
          );

          // Store the token and redirect to the dashboard page
          return res.redirect(
            `/auth/signup?token=${token}&success=true`
          );
        } else {
          return res.redirect("/auth/signup?message=emailexist");
        }
      } else {
        const newUser = new User({
          name,
          email,
          avatar_url: picture,
          provider: "google",
          isEmailVerified: true
        });

        await newUser.save();

        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

        // Store the token and redirect to the dashboard page
        return res.redirect(
          `/auth/signup?token=${token}&success=true`
        );
      }
    } catch (error) {
      console.error("Error handling Google callback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
