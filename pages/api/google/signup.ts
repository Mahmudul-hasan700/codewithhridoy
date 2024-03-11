// pages/api/google/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import GoogleUser, { GoogleUserDocument } from '@/models/googleuser';

// Connect to the database
dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, username, profile } = req.body;

    // Check if the user already exists
    const existingUser = await GoogleUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Create a new user
    const newUser: GoogleUserDocument = new GoogleUser({
      email,
      username,
      profile,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'An error occurred while registering user.' });
  }
}