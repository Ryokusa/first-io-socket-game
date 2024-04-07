import { Server as HttpServer } from "node:http";
import { Socket } from "socket.io";
import { Player } from "../../client/src/compositions/Player";
import { PlayerInfo } from "./PlayerInfo";
import { useServerSocket } from "./serverSocket";

export const useHost = (server: HttpServer) => {
  let playerInfos: PlayerInfo[] = [];

  const io = useServerSocket(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
      playerInfos = playerInfos.filter((info) => info.socketId !== socket.id);
    });

    socket.on("setPlayer", (player: Player) => {
      const index = playerInfos.findIndex(
        (info) => info.player.id === player.id
      );
      const playerInfo: PlayerInfo = { player, socketId: socket.id };
      if (index === -1) {
        console.log("playerAdded:", playerInfo.player);
        playerInfos.push(playerInfo);
      } else {
        console.log("playerUpdated:", playerInfo.player);
        playerInfos[index] = playerInfo;
      }

      emitPlayerInfos(socket, playerInfos);
    });
  });
};

const emitPlayerInfos = (socket: Socket, playerInfos: PlayerInfo[]) => {
  console.log(playerInfos);
  socket.emit("playerInfos", playerInfos);
};
