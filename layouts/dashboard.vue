<template>
  <div
    id="dashboard
  "
    class="flex h-[100vh] flex-col-reverse md:flex-row"
  >
    <Sidebar />
    <div
      class="flex h-full w-full flex-col md:p-4 overflow-auto bg-gradient-to-r from-[#551F91] from-0% to-[#3B1C7A] to-100% md:flex-1 lg:h-[100vh]"
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
