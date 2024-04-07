import { TAuthenticatedContext } from "@/types";
import { Socket } from "socket.io";
import { ref, watch } from "vue";
import { PlayerInfo } from "../../../server/src/PlayerInfo";
import { Player } from "./Player";
import { useClientSocket } from "./clientSocket";

const players = ref<Player[]>([]);
const socket = ref<Socket | undefined>(undefined);
let used = false;

const { connectSocket, disconnectSocket, connected, connecting } =
  useClientSocket();

export const useClient = (auth: TAuthenticatedContext) => {
  const player = ref<Player>({
    auth,
    id: auth.user.id,
    name: auth.user.username,
    input: { keys: {} },
  });

  connectSocket().then((_socket) => {
    socket.value = _socket;
    _socket.on("playerInfos", (playerInfos: PlayerInfo[]) => {
      console.log("playerInfos", playerInfos);
      players.value = playerInfos.map((info) => info.player);
    });

    watch(player, (player) => {
      setPlayer(player);
    });

    console.log("setting player");
    setPlayer(player.value);
  });

  return {
    players,
    disconnect: disconnectSocket,
    connected,
    connecting,
    player,
  };
};

const setPlayer = (player: Player) => {
  if (!socket.value) {
    console.error("socket not connected");
    return;
  }
  const index = players.value.findIndex((p) => p.id === player.id);
  if (index === -1) {
    players.value.push(player);
    players.value = players.value;
  } else {
    players.value[index] = player;
  }

  socket.value.emit("setPlayer", player);
};
