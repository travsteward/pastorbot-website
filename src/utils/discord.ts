// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.DISCORD_CLIENT_ID;
const REQUIRED_PERMISSIONS = '395137251392'; // Adjust this based on your bot's needs
const SCOPES = 'bot applications.commands';

export function getDiscordAuthUrl() {
  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${REQUIRED_PERMISSIONS}&scope=${SCOPES}`;
}

export function redirectToDiscordAuth() {
  window.location.href = getDiscordAuthUrl();
}