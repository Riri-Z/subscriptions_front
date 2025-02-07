<template>
  <div
    id="sidebar"
    class="sticky h-[8%] w-full flex-col bg-card-bg-color shadow-md shadow-black md:flex md:h-full md:w-[8rem] lg:w-[10rem]"
  >
    <span
      class="align-center text-primary-white-color hidden h-[125px] text-center md:flex md:border-b-2 md:border-button-disabled-color"
    >
      <h1 class="m-auto p-2 text-xl">Subscriptions tracker</h1>
    </span>

    <!-- ICONS NAVLINK -->
    <div
      class="flex h-full w-full flex-row justify-around md:flex-col md:justify-normal"
    >
      <div
        v-for="icon in icons"
        :key="icon.id"
        class="flex cursor-pointer gap-9 fill-slate-200 text-xs text-white transition-all duration-300 md:h-20 lg:text-sm lg:hover:bg-hover-effect-color"
        @click="handleNavLink(icon.route)"
      >
        <NavBarNavButton :icon="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
const { signOut } = useAuth();
interface Icon {
  id: number;
  name: string;
  route: string;
  path: string;
}
const emit = defineEmits(["toggleSidebar"]);

const icons = ref<Icon[]>([
  {
    id: 1,
    name: "acceuil",
    route: "home",
    path: "/icons/home.svg",
  },

  {
    id: 2,
    name: "Calendrier",
    route: "calendar",
    path: "/icons/calendar.svg",
  },
  {
    id: 3,
    name: "Déconnexion",
    route: "logout",
    path: "/icons/logout.svg",
  },
]);

/**
 * Log out user
 */
async function handleSignOut() {
  try {
    return await signOut({ callbackUrl: "/login" });
  } catch (error) {
    console.error(error);
    navigateTo("./login");
  }
}

async function handleNavLink(route: string) {
  /* si width <900 on ferme */
  if (window.innerWidth < 768) {
    emit("toggleSidebar");
  }
  if (route === "logout") {
    return await handleSignOut();
  }

  const subscriptionStore = useSubscriptionsStore();
  subscriptionStore.closeModal();
  if (route === "home") {
    return navigateTo("/dashboard");
  }
  return navigateTo("/dashboard/" + route);
}
</script>
