<template>
  <div
    id="sidebar"
    class="flex w-full flex-row justify-around bg-card-color lg:w-28 lg:flex-col"
  >
    <span
      class="mt-auto h-[65px] text-center text-primary-white-color lg:mt-1 lg:border-b-2 lg:border-gray-300"
      >Subscriptions tracker</span
    >
    <!-- ICONS NAVLINK -->
    <div class="flex flex-row lg:flex-col">
      <main
        v-for="icon in icons"
        class="flex cursor-pointer gap-5 fill-slate-200 text-white transition-all duration-300 hover:bg-gray-600 lg:h-28"
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
      </main>
    </div>
    <div class="py-10 transition-all duration-300 hover:bg-gray-600">
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
