import type { Client } from 'discord.js';
import type { BotEvent } from '../types.js';
import { importDefaultExports } from './loadModules.js';

const EVENTS_DIRECTORY = new URL('../events/', import.meta.url);

function isBotEvent(value: unknown): value is BotEvent {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'execute' in value &&
    typeof value.execute === 'function'
  );
}

/** Loads every event in src/events/ and attaches it to the client. */
export async function loadEvents(client: Client): Promise<void> {
  for (const { fileName, exported } of await importDefaultExports(EVENTS_DIRECTORY)) {
    if (!isBotEvent(exported)) {
      console.warn(`[events] Skipping ${fileName}: its default export is not an event.`);
      continue;
    }

    const event = exported;
    const listener = async (...args: unknown[]) => {
      try {
        // The event's own file types its arguments; here we only pass them through.
        await event.execute(...(args as Parameters<typeof event.execute>));
      } catch (error) {
        console.error(`[events] Error in "${event.name}" handler:`, error);
      }
    };

    if (event.once) {
      client.once(event.name, listener);
    } else {
      client.on(event.name, listener);
    }
  }
}
