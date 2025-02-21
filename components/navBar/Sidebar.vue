<template>
  <div
    id="sidebar"
    class="sticky h-[14%] w-full flex-col border-white bg-secondary shadow-custom md:flex md:h-full md:w-fit lg:w-[10rem]"
  >
    <span
      class="align-center text-primary-white-color md:border-button-disabled-color hidden h-[125px] text-center md:flex md:border-b-2"
    >
      <h1 class="m-auto p-2 text-xl">
        <p>Subscriptions</p>
        <p>tracker</p>
      </h1>
    </span>

    <!-- ICONS NAVLINK -->
    <div
      class="sticky flex h-full w-full flex-row justify-around md:flex-col md:justify-normal"
    >
      <div
        v-for="icon in icons"
        :key="icon.id"
        class="flex cursor-pointer gap-9 fill-slate-200 text-xs text-light transition-all duration-300 md:h-20 md:hover:bg-primary lg:text-sm"
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
    await signOut();
    window.location.href = "/login";
  } catch (error) {
    console.error(error);
    window.location.href = "/login";
  }
   (window.location.href = "/login");
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
