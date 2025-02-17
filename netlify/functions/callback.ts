import { Handler } from '@netlify/functions';

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = 'https://pastorbot.app/oauth/discord/callback';

export const handler: Handler = async (event) => {
  const code = event.queryStringParameters?.code;
  const state = event.queryStringParameters?.state;
  const isBot = event.queryStringParameters?.isBot === 'true';

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No code provided' })
    };
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token response error:', errorData);
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error('User info error:', errorData);
      throw new Error('Failed to get user info');
    }

    const userData = await userResponse.json();
    console.log('User data received:', userData);

    // If this was a bot installation, redirect to success
    if (isBot) {
      return {
        statusCode: 302,
        headers: {
          Location: '/success?discord=true',
        },
        body: JSON.stringify({ message: 'Bot installation successful' })
      };
    }

    // For user auth, redirect to pricing page with Discord ID and state
    return {
      statusCode: 302,
      headers: {
        Location: `/?discord_id=${userData.id}&${state}`,
      },
      body: JSON.stringify({ message: 'User authentication successful' })
    };
  } catch (error) {
    console.error('OAuth error:', error);
    return {
      statusCode: 302,
      headers: {
        Location: '/cancel?error=oauth_failed',
      },
      body: JSON.stringify({ error: 'OAuth failed' })
    };
  }
};