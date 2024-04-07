import { TAuthenticatedContext } from '../types';
<template>
  <PlayerIcon :players="players"></PlayerIcon>
</template>

<script setup lang="ts">
  import { TAuthenticatedContext } from "@/types";
  import { useClient } from "../compositions/client";
  import PlayerIcon from "./PlayerIcon.vue";
  const props = defineProps<{
    auth: TAuthenticatedContext;
  }>();

  const { players } = useClient(props.auth);
</script>

<style scoped></style>
