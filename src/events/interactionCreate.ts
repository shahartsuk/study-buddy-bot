import { Events, MessageFlags } from 'discord.js';
import type { BotEvent } from '../types.js';

const interactionCreate: BotEvent<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.warn(`[commands] No command named "${interaction.commandName}" is loaded.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`[commands] Error while running /${interaction.commandName}:`, error);

      const errorReply = {
        content: 'Something went wrong while running this command.',
        flags: MessageFlags.Ephemeral,
      } as const;

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorReply);
      } else {
        await interaction.reply(errorReply);
      }
    }
  },
};

export default interactionCreate;
