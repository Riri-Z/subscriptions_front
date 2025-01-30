<template>
  <div
    id="dashboard
  "
    class="relative flex h-[100vh] flex-row"
  >
    <Sidebar v-if="toggleSidebar" />

    <div
      class="relative flex h-full w-full overflow-auto bg-gradient-to-r from-[#551F91] from-0% to-[#3B1C7A] to-100% md:flex-1 lg:h-[100vh]"
    >
      <span
        class="absolute right-[1rem] my-3 md:hidden"
        @click="handleToggleSideBar"
      >
        <NuxtImg
          v-if="toggleSidebar"
          src="/icons/burger-menu-open.svg"
          width="24"
          height="24"
        >
        </NuxtImg>
        <NuxtImg v-else src="/icons/close-sidebar.svg" width="24" height="24">
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

const windowHeight = ref(window.innerWidth);
const toggleSidebar = ref(true);
onMounted(() => {
  nextTick(() => {
    window.addEventListener("resize", onResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
watch(windowHeight, () => {
  if (windowHeight.value <= 768) {
    toggleSidebar.value = true;
  }
});

function onResize() {
  windowHeight.value = window.innerHeight;
}

function handleToggleSideBar() {
  toggleSidebar.value = !toggleSidebar.value;
}
</script>
