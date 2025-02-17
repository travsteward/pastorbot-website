// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REQUIRED_PERMISSIONS = '395137251392';
const SCOPES = 'bot applications.commands';

// Debug log
console.log('Discord Client ID:', DISCORD_CLIENT_ID);

export function getDiscordAuthUrl() {
  return `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${REQUIRED_PERMISSIONS}&scope=${SCOPES}`;
}

export function redirectToDiscordAuth() {
  window.location.href = getDiscordAuthUrl();
}