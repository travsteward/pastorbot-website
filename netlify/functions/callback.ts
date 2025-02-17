import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = 'https://pastorbot.app/oauth/discord/callback';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' });

// Price ID mapping
const PRICE_IDS = {
  'Community': 'price_1QtWxCLK64haKytl1k9Etklp',
  'Discipleship': 'price_1QtWxaLK64haKytlqnojtTEH',
  'Ministry': 'price_1QtWxzLK64haKytlUKcIi2C0'
};

export const handler: Handler = async (event) => {
  console.log('Callback handler started');
  console.log('Environment check:', {
    hasClientId: !!CLIENT_ID,
    hasClientSecret: !!CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    // Log first few chars of secret to verify it's correct without exposing full value
    clientSecretPrefix: CLIENT_SECRET ? CLIENT_SECRET.substring(0, 4) + '...' : 'not set'
  });

  const code = event.queryStringParameters?.code;
  const state = event.queryStringParameters?.state;
  const isBot = event.queryStringParameters?.isBot === 'true';

  console.log('Query parameters:', { code: !!code, state, isBot });

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No code provided' })
    };
  }

  try {
    console.log('Attempting to exchange code for token...');
    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    });

    console.log('Token request parameters:', {
      url: 'https://discord.com/api/oauth2/token',
      clientIdUsed: CLIENT_ID,
      grantType: 'authorization_code',
      redirectUri: REDIRECT_URI
    });

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token response error:', errorData);
      console.error('Token response status:', tokenResponse.status);
      throw new Error(`Failed to get access token: ${errorData}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful');

    // Get user info
    console.log('Fetching user info...');
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error('User info error:', errorData);
      console.error('User info status:', userResponse.status);
      throw new Error(`Failed to get user info: ${errorData}`);
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

    // Parse state to get selected tier
    const stateParams = new URLSearchParams(state || '');
    const selectedTier = stateParams.get('tier');
    const priceId = selectedTier ? PRICE_IDS[selectedTier as keyof typeof PRICE_IDS] : null;

    if (!priceId) {
      throw new Error('Invalid tier selected');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${process.env.URL || 'https://pastorbot.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'https://pastorbot.app'}/cancel`,
      metadata: {
        discord_id: userData.id
      }
    });

    // Redirect directly to Stripe checkout
    return {
      statusCode: 302,
      headers: {
        Location: session.url || '/cancel?error=no_checkout_url',
      },
      body: JSON.stringify({ message: 'Redirecting to checkout' })
    };
  } catch (error) {
    console.error('Detailed OAuth error:', error);
    return {
      statusCode: 302,
      headers: {
        Location: '/cancel?error=oauth_failed&reason=' + encodeURIComponent(error.message),
      },
      body: JSON.stringify({ error: 'OAuth failed', details: error.message })
    };
  }
};