// pages/api/auth/google.js
import { google } from "googleapis";

const CLIENT_ID =
  "394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = `${req.headers.origin}/api/auth/google/callback`;
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];
const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const authUrl = OAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });
    res.redirect(authUrl);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
