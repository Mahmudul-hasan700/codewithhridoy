// pages/api/google/signup.ts
import { OAuth2Client } from 'google-auth-library';
import dbConnect from '@/utils/dbConnect';
import GoogleUser from '@/models/googleuser';

const CLIENT_ID = '394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com'; 

const client = new OAuth2Client(CLIENT_ID);

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { tokenId } = req.body;

        // Verify Google ID token
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if user already exists
        const existingUser = await GoogleUser.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Create new user
        const newUser = new GoogleUser({
          email,
          name,
          profilePicture: picture,
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: 'User registered successfully' });
      } catch (error) {
        console.error('Google signup error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}