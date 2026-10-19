import { Events } from 'discord.js';
import type { BotEvent } from '../types.js';

const ready: BotEvent<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[ready] Logged in as ${client.user.tag}`);
  },
};

export default ready;
