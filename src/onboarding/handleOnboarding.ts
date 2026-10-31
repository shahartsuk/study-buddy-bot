import {
  ActionRowBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
  type ButtonInteraction,
  type StringSelectMenuInteraction,
} from 'discord.js';
import {
  findInstitution,
  getInstitutionsByType,
  type InstitutionType,
} from '../config/institutions.js';

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
  // 1. What did the user pick? ('university' or 'college')
  const chosenType = interaction.values[0] as InstitutionType;

  // 2. Get the institutions of that type and turn them into menu options
  const institutions = getInstitutionsByType(chosenType);
  const options = institutions.map((institution) => ({
    label: institution.name,
    value: institution.id,
  }));

  // 3. build the menu
  const menu = new StringSelectMenuBuilder()
    .setCustomId('onboarding:institution')
    .setPlaceholder('בחר את המוסד שבו אתה לומד')
    .addOptions(options);

  // 4. Put it in a row and send it
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

  // Send it
  await interaction.reply({
    content: 'באיזה מוסד אתה לומד?',
    components: [row],
    flags: MessageFlags.Ephemeral,
  });
}

export async function handleInstitutionSelect(
  interaction: StringSelectMenuInteraction,
): Promise<void> {
  const chosenInstitution = interaction.values[0];
  if (!chosenInstitution) return;
  const option = findInstitution(chosenInstitution);
  await interaction.reply({
    content: 'בחרת ב' + option?.name,
    flags: MessageFlags.Ephemeral,
  });
}
