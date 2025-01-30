<template>
  <div
    id="sidebar"
    class="absolute z-10 flex h-full w-52 flex-col bg-card-color md:relative md:w-36 lg:w-44"
  >
    <span
      class="align-center flex h-[125px] border-b-2 border-gray-300 text-center text-primary-white-color"
    >
      <h1 class="m-auto">Subscriptions tracker</h1>
    </span>

    <!-- ICONS NAVLINK -->
    <div class="flex w-full flex-col justify-around">
      <div
        v-for="icon in icons"
        class="flex h-28 cursor-pointer gap-5 fill-slate-200 text-white transition-all duration-300 lg:hover:bg-gray-600"
        @click="handleNavLink(icon.name)"
      >
        <NavBarNavButton
          :icon="icon"
          @handle-click="handleNavLink(icon.name)"
        ></NavBarNavButton>
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
    name: "calendar",
    path: "/icons/calendar.svg",
  },
  {
    id: 3,
    name: "logout",
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
