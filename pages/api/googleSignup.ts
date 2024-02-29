// pages/api/googleSignup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      
      const { name, email, profileUrl } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
      }

      // Create a new user document
      const newUser = new User({
        name,
        email,
        profileUrl
      });

      // Save the user document to the database
      await newUser.save();

      return res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
      console.error('Google signup error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}