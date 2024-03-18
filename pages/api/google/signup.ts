// pages/api/auth/google/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import GoogleUser from "@/models/googleuser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request body:", req.body);
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { code } = req.body;

      const userInformation = decodeGoogleCode(code);

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

function decodeGoogleCode(code) {
  console.log('Received code for decoding:', code); // Log the received code

  try {
    const parts = code.split(".");
    console.log('Code parts:', parts); // Log the split parts

    if (parts.length < 2) {
      console.error('Error: Code does not contain expected parts');
      return null;
    }

    const payloadBase64 = parts[1];
    console.log('Payload Base64:', payloadBase64); // Log the Base64 part

    const payloadString = Buffer.from(payloadBase64, "base64").toString("utf-8");
    console.log('Payload string:', payloadString); // Log the decoded string

    const payload = JSON.parse(payloadString);
    console.log('Payload:', payload); // Log the parsed payload

    const { email, name, picture } = payload;
    return { email, name, picture };
  } catch (error) {
    console.error("Error decoding Google code:", error);
    return null;
  }
}
