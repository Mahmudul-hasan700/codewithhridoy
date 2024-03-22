// pages/api/google/signup.js
import { OAuth2Client } from 'google-auth-library';
import connectToDatabase from '@/utils/dbConnect';
import GoogleUser from '@/models/googleuser';

const CLIENT_ID = '394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com'; // Replace with your Google Client ID
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { code } = req.body;
      const userInformation = await verify(code);

      if (!userInformation) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Google code" });
      }

      const { email, name, picture } = userInformation;

      let user = await GoogleUser.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists." });
      }

      user = new GoogleUser({
        email,
        name,
        profilePicture: picture
      });

      await user.save();

      return res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          user
        });
    } catch (error) {
      console.error("Google signup error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}