import { MessageFlags, type ButtonInteraction } from 'discord.js';

export async function handleSignupButton(interaction: ButtonInteraction): Promise<void> {
  await interaction.reply({
    content: 'לחצת על הרשמה! 🎉',
    flags: MessageFlags.Ephemeral,
  });
}
