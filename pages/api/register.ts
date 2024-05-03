import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/utils/dbconnect';
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await dbConnect();
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      return res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully.",
          token: token
        });
    } catch (error) {
      console.error("Registration error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  } else {
    console.log("Invalid request method:", req.method); // Log invalid request method
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}