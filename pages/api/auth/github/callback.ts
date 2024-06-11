import fetch from "node-fetch";
import { parse } from "url";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const tokenUrl = "https://github.com/login/oauth/access_token";
const userUrl = "https://api.github.com/user";
const emailUrl = "https://api.github.com/user/emails";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { query } = parse(req.url, true);
    const code = query.code;

    if (!code) {
      return res
        .status(400)
        .json({ error: "Code is missing from query parameters" });
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code
        })
      });

      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        return res
          .status(400)
          .json({ error: "Failed to retrieve access token" });
      }

      const accessToken = tokenData.access_token;

      // Fetch user data
      const userResponse = await fetch(userUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      });

      const userData = await userResponse.json();

      // Fetch user emails
      const emailResponse = await fetch(emailUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      });

      const emailData = await emailResponse.json();
      const primaryEmail = emailData.find(
        email => email.primary
      ).email;

      // Check if the user already exists
      const existingUser = await User.findOne({
        email: primaryEmail
      });

      if (existingUser) {
        if (existingUser.provider === "github") {
          const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d"
            }
          );

          // Redirect to the login page with the token
          return res.redirect(
            `/auth/signup?token=${token}&success=true`
          );
        } else {
          return res.redirect(
            `/auth/signup?message=emailexist`
        }
      } else {
        // Create a new user
        const newUser = new User({
          name: userData.name || userData.login,
          email: primaryEmail,
          avatar_url: userData.avatar_url,
          provider: "github",
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

        // Redirect to the signup page with the token
        return res.redirect(
          `/auth/signup?token=${token}&success=true`
        );
      }
    } catch (error) {
      console.error("Error handling GitHub callback:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
