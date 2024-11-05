<template>
  <div id="sidebar" class="flex w-28 flex-col bg-card-color">
    <span
      class="mt-6 h-[65px] border-b-2 border-gray-300 text-center text-primary-white-color"
      >Subscriptions tracker</span
    >
    <div class="flex-auto">
      <div
        v-for="icon in icons"
        class="flex h-28 cursor-pointer fill-slate-200 text-white transition-all duration-300 hover:bg-gray-600"
        @click="handleNavLink(icon.name)"
      >
        <NuxtImg
          :key="icon.id"
          class="m-auto fill-slate-200 text-white"
          :src="icon.path"
          :alt="icon.name"
          width="24"
          height="24"
        />
      </div>
    </div>

    <div class="py-10 transition-all duration-300 hover:bg-gray-600">
      <SignOut />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

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

async function handleNavLink(route: string) {
  const subscriptionStore = useSubscriptionsStore();
  subscriptionStore.closeModal();
  if (route === "home") {
    return navigateTo("/dashboard");
  }
  return navigateTo("/dashboard/" + route);
}
</script>
