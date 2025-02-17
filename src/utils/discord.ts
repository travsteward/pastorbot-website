// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REQUIRED_PERMISSIONS = '395137251392'; // Adjust this based on your bot's needs
const SCOPES = 'bot applications.commands identify';
const REDIRECT_URI = import.meta.env.DEV
  ? 'http://localhost:8888/oauth/discord/callback'
  : `${window.location.origin}/oauth/discord/callback`;

// Debug log
console.log('Discord Client ID:', DISCORD_CLIENT_ID);

export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    permissions: REQUIRED_PERMISSIONS,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    response_type: 'code'
  });

  const url = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
  console.log('Generated Discord URL:', url);
  return url;
}

export function redirectToDiscordAuth() {
  window.location.href = getDiscordAuthUrl();
}