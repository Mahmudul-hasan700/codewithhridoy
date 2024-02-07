// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Load user data
    const userDataFilePath = path.join(process.cwd(), 'public', 'userData.json');
    try {
      const data = await fs.readFile(userDataFilePath, 'utf-8');
      const userData = JSON.parse(data);

      // Check if user with provided email and password exists
      const user = userData.find((user: any) => user.email === email && user.password === password);
      if (user) {
        // User found, return success
        return res.status(200).json({ success: true, message: 'Login successful!' });
      } else {
        // User not found, return failure
        return res.status(400).json({ success: false, message: 'User not found. Please try again.' });
      }
    } catch (error) {
      console.error('Error reading user data:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}