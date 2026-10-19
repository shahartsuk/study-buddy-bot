import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';

/**
 * Builds the /ping reply text.
 * Kept separate from execute() so it can be unit-tested without Discord.
 */
export function formatPingReply(roundTripMs: number, websocketPingMs: number): string {
  // discord.js reports -1 until the first heartbeat has been measured.
  const websocket = websocketPingMs >= 0 ? `${Math.round(websocketPingMs)}ms` : 'not measured yet';
  return `🏓 Pong! Response time: ${roundTripMs}ms | WebSocket: ${websocket}`;
}

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong and the bot response time'),

  async execute(interaction) {
    const response = await interaction.reply({ content: 'Pinging...', withResponse: true });

    // Both timestamps come from Discord, so the difference is the real round trip.
    const replyTimestamp = response.resource?.message?.createdTimestamp ?? Date.now();
    const roundTripMs = replyTimestamp - interaction.createdTimestamp;

    await interaction.editReply(formatPingReply(roundTripMs, interaction.client.ws.ping));
  },
};

export default ping;
