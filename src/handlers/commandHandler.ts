import { Collection } from 'discord.js';
import type { Command } from '../types.js';
import { importDefaultExports } from './loadModules.js';

const COMMANDS_DIRECTORY = new URL('../commands/', import.meta.url);

function isCommand(value: unknown): value is Command {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'execute' in value &&
    typeof value.execute === 'function'
  );
}

/** Loads every command in src/commands/ into a collection keyed by command name. */
export async function loadCommands(): Promise<Collection<string, Command>> {
  const commands = new Collection<string, Command>();

  for (const { fileName, exported } of await importDefaultExports(COMMANDS_DIRECTORY)) {
    if (!isCommand(exported)) {
      console.warn(`[commands] Skipping ${fileName}: its default export is not a command.`);
      continue;
    }
    commands.set(exported.data.name, exported);
  }

  return commands;
}
