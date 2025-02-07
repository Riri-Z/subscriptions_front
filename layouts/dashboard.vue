<template>
  <div
    id="dashboard
  "
    class="flex h-[100vh] flex-col-reverse bg-app-bg-color text-main-text-color md:flex-row"
  >
    <Sidebar />
    <div
      class="flex h-full w-full flex-col overflow-auto md:flex-1 md:p-4 lg:h-[100vh]"
    >
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
</script>
