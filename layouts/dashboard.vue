<template>
  <div class="flex h-[100vh] w-[100vw] flex-row">
    <Sidebar/>
    <div class="flex flex-1 bg-custom-gradient"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "~/components/Sidebar.vue";
</script>
