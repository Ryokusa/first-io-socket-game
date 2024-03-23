import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

const getIO = (server: HttpServer) => {
  return new Server(server);
};

export const useServerSocket = (server: HttpServer) => {
  const io = getIO(server);
  console.log("connecting socket");
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};
