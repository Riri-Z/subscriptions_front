<template>
  <div
    id="sidebar"
    class="sticky h-[8%] w-full md:flex md:h-full flex-col  bg-card-color md:relative md:w-40 laptop:w-42 lg:w-44 "
  >
    <span
      class="hidden align-center md:flex h-[125px] md:border-b-2 md:border-gray-300 text-center text-primary-white-color"
    >
      <h1 class="m-auto p-10">Subscriptions tracker</h1>
    </span>

    <!-- ICONS NAVLINK -->
    <div class="flex w-full h-full flex-row md:flex-col justify-around md:justify-normal">
      <div
        v-for="icon in icons"
        class="flex md:h-28 cursor-pointer gap-5 fill-slate-200 text-xs text-white transition-all duration-300 lg:text-base lg:hover:bg-gray-600"
        @click="handleNavLink(icon.route)"
      >
        <NavBarNavButton :icon="icon"></NavBarNavButton>
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
