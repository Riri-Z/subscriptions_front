<template>
  <div class="flex w-[20vh] flex-col bg-card-color">
    <!--     height: 65px;
    border-bottom: solid; -->
    <span
      class="md: mt-6 h-[65px] border-b-2 border-gray-300 text-center text-primary-white-color"
      >Subscriptions tracker</span
    >
    <NuxtImg
      class="m-auto"
      v-for="icon in icons"
      :key="icon.id"
      :src="icon.path"
      :alt="icon.name"
      width="24"
      height="24"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Icon {
  id: number;
  name: string;
  path: string;
}

const icons = ref<Icon[]>([
  {
    id: 1,
    name: "profile",
    path: "/icons/profile.png",
  },
  {
    id: 2,
    name: "add",
    path: "/icons/add.png",
  },
  {
    id: 3,
    name: "schedule",
    path: "/icons/schedule.png",
  },
  {
    id: 4,
    name: "group",
    path: "/icons/group.png",
  },
  {
    id: 5,
    name: "notification",
    path: "/icons/notifications.png",
  },
  {
    id: 6,
    name: "search",
    path: "/icons/search.png",
  },
]);
</script>
