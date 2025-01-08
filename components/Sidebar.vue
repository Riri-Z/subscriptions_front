<template>
  <div
    id="sidebar"
    class="flex h-20 w-full flex-row bg-card-color lg:h-full lg:w-28 lg:flex-col"
  >
    <span
      class="align-center hidden h-[125px] text-center text-primary-white-color lg:flex lg:border-b-2 lg:border-gray-300"
    >
      <h1 class="m-auto">Subscriptions tracker</h1>
    </span>

    <!-- ICONS NAVLINK -->
    <div class="flex w-full flex-row justify-around lg:flex-col">
      <div
        v-for="icon in icons"
        class="flex cursor-pointer gap-5 fill-slate-200 text-white transition-all duration-300 lg:h-28 lg:hover:bg-gray-600"
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
      <SignOut />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const { isMobileOrTablet } = useDevice();

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
  /*   {
    id: 2,
    name: "profile",
    path: "/icons/profile.svg",
  }, */
  {
    id: 3,
    name: "calendar",
    path: "/icons/calendar.svg",
  },
  /*   {
    id: 4,
    name: "settings",
    path: "/icons/settings.svg",
  }, */
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
