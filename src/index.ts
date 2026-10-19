import { Client, GatewayIntentBits } from 'discord.js';
import { loadConfig } from './config/env.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

const config = loadConfig();

// The Guilds intent is all we need for slash commands.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = await loadCommands();
console.log(`[startup] Loaded ${client.commands.size} command(s).`);

await loadEvents(client);
await client.login(config.discordToken);
