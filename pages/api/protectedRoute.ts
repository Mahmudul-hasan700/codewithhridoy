// pages/api/protectRoute.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized. No token provided.' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decodedToken);
      return res.status(200).json({ success: true, message: 'Protected route accessed successfully.' });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}