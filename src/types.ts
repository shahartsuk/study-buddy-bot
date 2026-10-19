import type {
  ChatInputCommandInteraction,
  ClientEvents,
  Collection,
  SlashCommandBuilder,
} from 'discord.js';

/** A slash command. Every file in src/commands/ default-exports one of these. */
export interface Command {
  /** The command definition sent to Discord (name, description, options). */
  data: Pick<SlashCommandBuilder, 'name' | 'toJSON'>;
  /** Runs when a user invokes the command. */
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

/** A Discord event listener. Every file in src/events/ default-exports one of these. */
export interface BotEvent<EventName extends keyof ClientEvents = keyof ClientEvents> {
  name: EventName;
  /** If true, the listener runs only the first time the event fires. */
  once?: boolean;
  execute(...args: ClientEvents[EventName]): Promise<void> | void;
}

// Adds a `commands` property to discord.js's Client type,
// so any event handler can look commands up through `interaction.client.commands`.
declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}
