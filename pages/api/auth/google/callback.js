// pages/api/auth/google/callback.js
import { google } from 'googleapis';
import dbConnect from '@/utils/dbconnect';
import googleUser from '@/models/googleuser';

const CLIENT_ID = '394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://codewithhridoy.vercel.app/api/auth/google/callback';
const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    try {
      const { tokens } = await OAuth2Client.getToken(code);
      OAuth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({
        auth: OAuth2Client,
        version: 'v2',
      });
      const { data } = await oauth2.userinfo.get();
      console.log('Google User Data:', data);

      const existingUser = await googleUser.findOne({ email: data.email });
      if (existingUser) {
        res.redirect('/dashboard');
      } else {
        await googleUser.create({
          name: data.name,
          email: data.email,
          profileUrl: data.picture,
        });
        res.redirect('/dashboard');
      }
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}