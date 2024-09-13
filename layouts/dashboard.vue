<template>
  <div class="flex h-[100vh] w-[100vw] flex-row">
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <div class="bg-custom-gradient flex flex-1"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '~/components/Sidebar.vue';
</script>

<style></style>
