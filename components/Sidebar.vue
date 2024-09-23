<template>
  <div class="flex flex-col bg-card-color">
    <span
      class="md: mt-6 h-[65px] border-b-2 border-gray-300 text-center text-primary-white-color"
      >Subscriptions tracker</span
    >
    <div
      class="flex flex-auto fill-slate-200 text-white hover:bg-gray-600"
      v-for="icon in icons"
      @click="handleNavLink(icon.name)"
    >
      <NuxtImg
        class="m-auto fill-slate-200 text-white"
        :key="icon.id"
        :src="icon.path"
        :alt="icon.name"
        width="24"
        height="24"
      />
    </div>

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
    name: "home",
    path: "/icons/home.svg",
  },
  {
    id: 2,
    name: "profile",
    path: "/icons/profile.svg",
  },
  {
    id: 3,
    name: "calendar",
    path: "/icons/calendar.svg",
  },
  {
    id: 4,
    name: "settings",
    path: "/icons/settings.svg",
  },
]);

async function handleNavLink(params: string) {
  if (params !== "home") {
    return navigateTo("/dashboard/" + params);
  }
  return navigateTo("/dashboard");
}
</script>
