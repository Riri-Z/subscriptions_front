<template>
  <div
    id="dashboard
  "
    class="flex h-[100vh] flex-col-reverse bg-primary text-light md:flex-row md:gap-0"
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
dateStore.setDaysInMonth(dayjs(new Date()).format("YYYY-MM-DD"));
</script>
