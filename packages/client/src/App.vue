<script setup lang="ts">
  import { useClientSocket } from "./compositions/clientSocket";
  import {
    getUserAvatarUrl,
    useAuthenticatedContext,
  } from "./compositions/useAuthenticatedContext";
  import { TAuthenticatedContext } from "./types";

  const { auth, settingUp } = useAuthenticatedContext();

  const _getUserAvatarUrl = (auth: TAuthenticatedContext) => {
    return getUserAvatarUrl({ guildMember: null, user: auth.user });
  };

  const { connectSocket, disconnectSocket, connected, connecting } =
    useClientSocket();
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div>
    <p v-if="settingUp">Setting up...</p>
    <p v-else-if="auth">
      Authenticated!<br />
      <figure class="icon-circle">
        <img :src="_getUserAvatarUrl(auth)" alt="" />
        <figcaption>{{ auth.user.username }}</figcaption>
      </figure>
    </p>
    <p v-else>Not authenticated</p>
    <p v-if="!connected && !connecting">
      <button @click="connectSocket()">接続</button>
    </p>
    <p v-else-if="connecting">Connecting...</p>
    <p v-else>接続済み<button @click="disconnectSocket()">切断</button></p>
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }

  .icon-circle {
    max-width: 100px;
    overflow: hidden;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .icon-circle img {
    max-width: 50px;
    border-radius: 50%;
    width: 100%;
    height: auto;
  }

  figcaption {
    background-color: #afa;
    color: #040;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
  }
</style>
