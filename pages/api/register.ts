// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/utils/dbconnect';
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';

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
      const emailVerificationToken = crypto.randomBytes(20).toString('hex');
      

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        emailVerificationToken,
      });
      await newUser.save();

      // Send the verification email with the redirect URL
      const verificationUrl = `${req.headers.origin}/auth/confirm?token=${emailVerificationToken}`;
      await sendEmail({
        to: email,
        subject: 'Verify Your Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
            <div style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333;">Hello ${name},</h2>
              <p style="margin-bottom: 20px;">Thank you for signing up with us!</p>
              <p style="margin-bottom: 20px;">To get started, please verify your email by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
              </div>
              <p style="margin-top: 20px;">If you didn't sign up for an account, you can ignore this email.</p>
              <p style="margin-top: 20px;">Thanks,<br/>Codewithhridoy</p>
            </div>
          </div>
        `,
      });

      return res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully. Please check your email to verify your account.",
        });
    } catch (error) {
      console.error("Registration error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}