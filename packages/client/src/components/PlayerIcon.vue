<template>
  <figure class="icon-circle">
    <template v-for="player in players">
      <img :src="_getUserAvatarUrl(player.auth)" alt="" />
      <figcaption>{{ player.name }}a</figcaption>
    </template>
  </figure>
</template>

<script setup lang="ts">
  import { toRefs } from "vue";
  import { Player } from "../compositions/Player";
  import { getUserAvatarUrl } from "../compositions/useAuthenticatedContext";
  import { TAuthenticatedContext } from "../types";

  const props = defineProps<{
    players: Player[];
  }>();

  const _getUserAvatarUrl = (auth: TAuthenticatedContext) => {
    return getUserAvatarUrl({ guildMember: null, user: auth.user });
  };

  const { players } = toRefs(props);
</script>

<style scoped>
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
