import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import type { Command } from '../types.js';

const setupOnboarding: Command = {
  data: new SlashCommandBuilder()
    .setName('setup-onboarding') // הפקודה תיקרא setup-onboarding
    .setDescription('Post the signup message') // תיאור קצר באנגלית
    // Only admins can see and use this command
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const button = new ButtonBuilder() // create a new button object (like `new` in C#)
      .setCustomId('onboarding:start') // internal name, so later we know WHICH button was clicked
      .setLabel('📝 הרשמה') // the text the user sees on the button
      .setStyle(ButtonStyle.Primary); // the color: Primary = blue
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
    await interaction.reply({
      content: 'ברוכים הבאים לשרת קהילה של סטודנטים מכל הארץ\nכאן תוכלו ללמוד בקבוצות\nלחפש מורים פרטיים\nלבקש חומרים לקורסים שאתם לומדים\nאו סתם לדבר עם סטודנטים אחרים\nמבקש לעקוב אחרי חוקי השרת ולהתנהג בהתאם\nתודה רבה לכל מי שנכנס ועוזר לפרסם את השרת',
      components: [row],
    });
  },
};

export default setupOnboarding;
