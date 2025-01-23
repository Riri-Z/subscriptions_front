<template>
  <div
    id="dashboard
  "
    class="flex h-[100vh] flex-col-reverse lg:flex-row"
  >
    <Sidebar />

    <div
      class="flex h-full overflow-auto bg-custom-gradient md:flex-1 lg:h-[100vh]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import Sidebar from "~/components/Sidebar.vue";
import { useDateStore } from "~/store/dateStore";

const dateStore = useDateStore();
dateStore.setDaysInMonth(dayjs(new Date()));
</script>
