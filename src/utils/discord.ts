// Discord OAuth configuration
const DISCORD_CLIENT_ID = import.meta.env.DISCORD_CLIENT_ID;
const REQUIRED_PERMISSIONS = '395137251392'; // Adjust this based on your bot's needs
const SCOPES = 'bot applications.commands';

export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    permissions: REQUIRED_PERMISSIONS,
    scope: SCOPES,
    response_type: 'code',
    redirect_uri: `${window.location.origin}/success`
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

export function redirectToDiscordAuth() {
  window.location.href = getDiscordAuthUrl();
}