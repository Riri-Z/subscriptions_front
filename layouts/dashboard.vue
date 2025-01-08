<template>
  <div class="flex h-[100vh] min-w-full flex-col-reverse lg:flex-row">
    <Sidebar />

    <div
      class="flex h-full overflow-auto bg-custom-gradient md:flex-1 lg:h-[100vh]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "~/components/Sidebar.vue";
</script>
