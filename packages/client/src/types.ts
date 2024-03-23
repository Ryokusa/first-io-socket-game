import type { AsyncReturnType } from "type-fest";
import { discordSdk } from "./discordSdk";

/**
 * 型定義
 * 参照：https://github.com/discord/embedded-app-sdk/blob/main/examples/react-colyseus/packages/client/src/types.tsx
 */

export type TAuthenticateResponse = AsyncReturnType<
  typeof discordSdk.commands.authenticate
>;

export type TAuthenticatedContext = TAuthenticateResponse;

export interface IGuildsMembersRead {
  roles: string[];
  nick: string | null;
  avatar: string | null;
  premium_since: string | null;
  joined_at: string;
  is_pending: boolean;
  pending: boolean;
  communication_disabled_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  mute: boolean;
  deaf: boolean;
}
