<template>
  <div class="m-auto">
    main content
    <button class="h-5 w-14" @click="getUserInformation">test</button>
    <div v-if="userStore.loading">Loading...</div>
    <div v-else-if="userStore.error">Error: {{ userStore.error }}</div>
    <div v-else-if="userStore.user">User: {{ userStore.user?.username }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
definePageMeta({
  layout: 'dashboard',
});

function getUserInformation() {
  userStore.getUserInformation('30');
}
</script>

<style></style>
