// pages/api/google/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import GoogleUser, { GoogleUserDocument } from '@/models/googleuser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { email, username, profile } = req.body;

      // Check if the user already exists
      const existingUser = await GoogleUser.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
      }

      // Create a new GoogleUser document
      const newUser: GoogleUserDocument = new GoogleUser({
        email,
        username,
        profile,
      });

      // Save the user to the database
      await newUser.save();

      return res.status(201).json({ success: true, message: 'User created successfully.' });
    } catch (error) {
      console.error('Google signup error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}