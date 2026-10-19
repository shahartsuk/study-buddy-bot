# Study Buddy

A Discord bot for a community server of students from all over Israel.
Built with TypeScript, [discord.js](https://discord.js.org) v14 and Node.js.

> Status: early skeleton. The only command so far is `/ping`.

## Tech stack

- **TypeScript** (strict, ESM) on **Node.js 22+**
- **discord.js v14** for the Discord API
- **Vitest** for tests, **ESLint** + **Prettier** for code quality
- **tsx** to run TypeScript directly in development

## Project structure

```
src/
  commands/      One file per slash command (loaded automatically)
  events/        One file per Discord event (loaded automatically)
  handlers/      Code that loads commands and events
  config/        Reads and validates environment variables
  db/            Reserved for the database layer (not built yet)
  index.ts       Bot entry point
  register-commands.ts  Registers slash commands in the test server
tests/           Unit tests
```

To add a command, create a file in `src/commands/` that default-exports a `Command`
(see `src/commands/ping.ts`), then run `npm run register`.

## Setting up the bot

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
   and click **New Application**.
2. **General Information**: copy the **Application ID**. This is your `CLIENT_ID`.
3. **Bot**: click **Reset Token** and copy the token. This is your `DISCORD_TOKEN`.
   Keep it secret.
4. **OAuth2 > URL Generator**: tick the `bot` and `applications.commands` scopes,
   then open the generated URL to invite the bot to your test server.
5. In Discord, turn on **Settings > Advanced > Developer Mode**, right-click your
   test server and choose **Copy Server ID**. This is your `GUILD_ID`.
6. Copy the example env file and fill in the three values:

   ```bash
   cp .env.example .env
   ```

## Running

```bash
npm install
npm run register   # register slash commands in the test server (rerun after changing commands)
npm run dev        # run the bot and restart it whenever a file changes
```

Production:

```bash
npm run build
npm start
```

## Scripts

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Runs the bot from source and restarts it on changes |
| `npm run build`     | Compiles TypeScript into `dist/`                    |
| `npm start`         | Runs the compiled bot from `dist/`                  |
| `npm run register`  | Registers slash commands in the `GUILD_ID` server   |
| `npm test`          | Runs the tests                                      |
| `npm run lint`      | Lints the code with ESLint                          |
| `npm run typecheck` | Type-checks `src/` and `tests/` without building    |
| `npm run format`    | Formats the code with Prettier                      |
