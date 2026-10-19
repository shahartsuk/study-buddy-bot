import { REST, Routes } from 'discord.js';
import { loadConfig } from './config/env.js';
import { loadCommands } from './handlers/commandHandler.js';

// Registers the slash commands in a single test server (GUILD_ID).
// Guild commands update instantly, unlike global commands which can take a while.

const config = loadConfig();
const commands = await loadCommands();
const body = commands.map((command) => command.data.toJSON());

const rest = new REST().setToken(config.discordToken);
await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body });

console.log(`[register] Registered ${body.length} command(s) in guild ${config.guildId}.`);
