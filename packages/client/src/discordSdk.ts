import { DiscordSDK } from "@discord/embedded-app-sdk";

const queryParams = new URLSearchParams(window.location.search);
const isEmbedded = queryParams.get("frame_id") != null;

console.log(import.meta.env.VITE_DISCORD_CLIENT_ID);
export const discordSdk = new DiscordSDK(
  import.meta.env.VITE_DISCORD_CLIENT_ID
);
