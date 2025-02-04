<template>
  <div
    id="dashboard
  "
    class="relative flex h-[100vh] flex-row"
  >
    <Sidebar v-if="toggleSidebar" @toggle-sidebar="handleToggleSideBar" />

    <div
      class="relative flex h-full w-full flex-col overflow-auto bg-gradient-to-r from-[#551F91] from-0% to-[#3B1C7A] to-100% md:flex-1 lg:h-[100vh]"
    >
      <!-- Icon to display / hide sidebar -->
      <span
        class="mx-5 my-2 flex self-end md:hidden"
        @click="handleToggleSideBar"
      >
        <NuxtImg
          v-if="toggleSidebar"
          src="/icons/burger-menu-open.svg"
          width="24"
          height="24"
          alt="Open sidebar"
        >
        </NuxtImg>
        <NuxtImg
          v-else
          src="/icons/close-sidebar.svg"
          width="24"
          height="24"
          alt="close sidebar"
        >
        </NuxtImg>
      </span>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import Sidebar from "~/components/navBar/Sidebar.vue";
import { useDateStore } from "~/store/dateStore";

const dateStore = useDateStore();
dateStore.setDaysInMonth(dayjs(new Date()));

const toggleSidebar = ref(true);

function handleToggleSideBar() {
  toggleSidebar.value = !toggleSidebar.value;
}
</script>
