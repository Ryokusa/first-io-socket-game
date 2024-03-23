import { discordSdk } from "@/discordSdk";
import { IGuildsMembersRead, TAuthenticatedContext } from "@/types";
import { Types } from "@discord/embedded-app-sdk";
import { ref } from "vue";

const auth = ref<TAuthenticatedContext | null>(null);
const settingUp = ref(false);

export function useAuthenticatedContext() {
  if (auth.value == null && !settingUp.value) {
    setUpDiscordSdk();
  }
  return { auth, settingUp };
}

const setUpDiscordSdk = async () => {
  settingUp.value = true;
  console.log("Setting up Discord SDK");
  await discordSdk.ready();
  console.log("Discord SDK is ready");
  console.log(import.meta.env.VITE_DISCORD_CLIENT_ID);

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify", "guilds"],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth.value = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth.value == null) {
    throw new Error("Authenticate command failed");
  }
  settingUp.value = false;
};

interface GetUserAvatarArgs {
  guildMember: IGuildsMembersRead | null;
  user: Partial<Types.User>;
  cdn?: string;
  size?: number;
}

export function getUserAvatarUrl({
  guildMember,
  user,
  cdn = `https://cdn.discordapp.com`,
  size = 256,
}: GetUserAvatarArgs): string {
  if (guildMember?.avatar != null && discordSdk.guildId != null) {
    return `${cdn}/guilds/${discordSdk.guildId}/users/${user.id}/avatars/${guildMember.avatar}.png?size=${size}`;
  }
  if (user.avatar != null) {
    return `${cdn}/avatars/${user.id}/${user.avatar}.png?size=${size}`;
  }

  const defaultAvatarIndex = Math.abs(Number(user.id) >> 22) % 6;
  return `${cdn}/embed/avatars/${defaultAvatarIndex}.png?size=${size}`;
}
