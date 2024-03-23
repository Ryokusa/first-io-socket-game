import { Socket, io } from "socket.io-client";

import { ref } from "vue";

const clientSocket = ref<Socket | null>(null);
const connected = ref(false);
const connecting = ref(false);

const connectSocket = () => {
  if (connected.value) return console.log("Already connected");

  console.log("connecting socket");
  connecting.value = true;
  clientSocket.value = io();

  clientSocket.value?.on("connect", () => {
    connected.value = true;
    connecting.value = false;

    console.log("a user connected");
  });

  clientSocket.value?.on("disconnect", () => {
    connected.value = false;

    console.log("user disconnected");
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
