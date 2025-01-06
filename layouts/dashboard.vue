<template>
  <div class="flex h-[100vh] md:h-[100vh] min-w-full md:w-[100vw] flex-col md:flex-row">
    <Sidebar />

    <div class="flex h-[100vh] md:flex-1 bg-custom-gradient"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "~/components/Sidebar.vue";
</script>
