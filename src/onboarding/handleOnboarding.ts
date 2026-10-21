import {
  ActionRowBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
  type ButtonInteraction,
  type StringSelectMenuInteraction,
} from 'discord.js';

export async function handleSignupButton(interaction: ButtonInteraction): Promise<void> {
  // 1. Build the menu
  const menu = new StringSelectMenuBuilder()
    .setCustomId('onboarding:type')
    .setPlaceholder('בחר סוג מוסד')
    .addOptions({ label: 'אוניברסיטה', value: 'university' }, { label: 'מכללה', value: 'college' });
  // 2. Put it in a row
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
  // 3 Send it
  await interaction.reply({
    content: 'באיזה סוג מוסד אתה לומד?',
    components: [row],
    flags: MessageFlags.Ephemeral,
  });
}

export async function handleTypeSelect(interaction: StringSelectMenuInteraction): Promise<void> {
  // The user's choice arrives as an array, e.g. ['college']
  const chosen = interaction.values[0];

  await interaction.reply({
    content: 'בחרת: ' + chosen,
    flags: MessageFlags.Ephemeral,
  });
}
