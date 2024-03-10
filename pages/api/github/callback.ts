import axios from 'axios';
import qs from 'qs';
import GitHubUser from '@/models/githubUserModel';

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    // Exchange code for access token
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      qs.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = accessTokenResponse.data.access_token;

    // Use the access token to fetch user data from GitHub API
    const userDataResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    // Extract user data from the response
    const userData = userDataResponse.data;

    // Log GitHub user data for debugging
    console.log('GitHub user data:', userData);

    // Create a new GitHubUser document
    const newUser = new GitHubUser({
      login: userData.login,
      name: userData.name,
      email: userData.email,
      avatarUrl: userData.avatar_url,
      // Add other fields as needed
    });

    // Save the new user document to MongoDB
    await newUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during GitHub callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}