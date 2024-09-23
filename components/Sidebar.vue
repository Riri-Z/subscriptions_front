<template>
  <div class="w-min-10px flex flex-col bg-card-color">
    <!--     height: 65px;
    border-bottom: solid; -->
    <span
      class="md: mt-6 h-[65px] border-b-2 border-gray-300 text-center text-primary-white-color"
      >Subscriptions tracker</span
    >
    <NuxtImg
      class="m-auto fill-slate-200 text-white"
      v-for="icon in icons"
      :key="icon.id"
      :src="icon.path"
      :alt="icon.name"
      width="24"
      height="24"
    />
    <div class="border-t-2 border-gray-300 p-10 hover:bg-gray-600">
      <SignOut />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Icon {
  id: number;
  name: string;
  path: string;
}

const icons = ref<Icon[]>([
  {
    id: 1,
    name: "profile",
    path: "/icons/profile.svg",
  },
  {
    id: 2,
    name: "calendar",
    path: "/icons/calendar.svg",
  },
  {
    id: 3,
    name: "settings",
    path: "/icons/settings.svg",
  },
]);
</script>
