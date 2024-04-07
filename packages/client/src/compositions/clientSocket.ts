import { Socket, io } from "socket.io-client";

import { ref } from "vue";

const clientSocket = ref<Socket | null>(null);
const connected = ref(false);
const connecting = ref(false);

const connectSocket = () => {
  return new Promise<Socket>((resolve) => {
    if (connected.value) return console.log("Already connected");

    console.log("connecting socket");
    connecting.value = true;
    const socket = io();
    socket.on("connect", () => {
      console.log("a user connected");
      connected.value = true;
      connecting.value = false;
      resolve(socket);
    });

    socket.on("disconnect", () => {
      connected.value = false;

      console.log("user disconnected");
    });

    clientSocket.value = socket;
  });
};

const disconnectSocket = () => {
  if (!clientSocket.value) return console.log("No socket to disconnect");
  clientSocket.value?.disconnect();
  connected.value = false;
};

export const useClientSocket = () => {
  return {
    connectSocket,
    disconnectSocket,
    connected,
    connecting,
    clientSocket,
  };
};
