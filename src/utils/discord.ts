// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REQUIRED_PERMISSIONS = '395137251392';
const BOT_SCOPES = 'bot applications.commands';
const USER_SCOPES = 'identify';

// Debug log
console.log('Discord Client ID:', DISCORD_CLIENT_ID);

// URLs for different OAuth flows
export function getBotAuthUrl() {
  return `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${REQUIRED_PERMISSIONS}&scope=${BOT_SCOPES}`;
}

export function getUserAuthUrl() {
  // Use the same redirect URI that's configured in Discord Developer Portal
  const redirectUri = 'https://pastorbot.app/oauth/discord/callback';
  return `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${USER_SCOPES}`;
}

export function redirectToDiscordAuth(isBot = false) {
  window.location.href = isBot ? getBotAuthUrl() : getUserAuthUrl();
}