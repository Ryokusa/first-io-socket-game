declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_DISCORD_CLIENT_ID: string;
    readonly VITE_DISCORD_CLIENT_SECRET: string;
  }
}
