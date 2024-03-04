// Server-side code (pages/api/auth/google.ts)
import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { JWT, TokenPayload } from 'google-auth-library';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tokenId } = req.body;

  try {
    // Verify Google token
    const { email, name, picture } = await verifyGoogleToken(tokenId);

    // Find or create user based on email
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profileUrl: picture,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function verifyGoogleToken(tokenId: string): Promise<TokenPayload> {
  const client = new JWT({
    keyFile: '/blog-42cb9-dd19e6a0729b.json',
    subject: process.env.SERVICE_ACCOUNT_EMAIL,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'], 
  });

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    return { email, name, picture };
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw new Error('Google token verification failed');
  }
}