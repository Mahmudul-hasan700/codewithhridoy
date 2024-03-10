import axios from 'axios';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    // Construct GitHub OAuth URL
    const githubOAuthUrl = 'https://github.com/login/oauth/authorize';
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/github/callback`;
    const scope = 'user:email'; // Specify the scope you need
    const url = `${githubOAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    res.status(200).json({ redirectUrl: url });
  } catch (error) {
    console.error('Error during GitHub signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}