export interface BotConfig {
  discordToken: string;
  clientId: string;
  guildId: string;
}

/**
 * Reads the bot settings from environment variables (loaded from .env)
 * and fails fast with a clear message if any of them is missing.
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): BotConfig {
  const discordToken = env.DISCORD_TOKEN?.trim();
  const clientId = env.CLIENT_ID?.trim();
  const guildId = env.GUILD_ID?.trim();

  if (!discordToken || !clientId || !guildId) {
    const missing = [
      !discordToken && 'DISCORD_TOKEN',
      !clientId && 'CLIENT_ID',
      !guildId && 'GUILD_ID',
    ].filter(Boolean);

    throw new Error(
      `Missing environment variables: ${missing.join(', ')}. ` +
        'Copy .env.example to .env and fill in your values.',
    );
  }

  return { discordToken, clientId, guildId };
}
