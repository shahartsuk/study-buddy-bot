import {
  ActionRowBuilder,
  LabelBuilder,
  MessageFlags,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
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
  // 1. The text box where the user types
  const fieldInput = new TextInputBuilder()
    .setCustomId('onboarding:studies')
    .setStyle(TextInputStyle.Short);

  // 2. The question, with the text box inside it
  const fieldLabel = new LabelBuilder().setLabel('מה אתה לומד?').setTextInputComponent(fieldInput);

  // 3. The form window, with the question inside it
  const modal = new ModalBuilder()
    .setCustomId('onboarding:studiesForm')
    .setTitle('פרטי הלימודים - ' + option?.name)
    .addLabelComponents(fieldLabel);

  // 4. Show the window
  await interaction.showModal(modal);
}
