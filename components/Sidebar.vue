<template>
  <div class="flex w-[10vh] flex-col bg-card-color">
    <NuxtImg
      class="m-auto"
      v-for="icon in icons"
      :key="icon.id"
      :src="icon.path"
      :alt="icon.name"
      width="24"
      height="24"
    />
  </div>
</template>

<script lang="ts" setup>
interface Icon {
  id: number;
  name: string;
  path: string;
}

const icons = ref<Icon[]>([
  {
    id: 1,
    name: 'profile',
    path: '/icons/profile.png',
  },
  {
    id: 2,
    name: 'add',
    path: '/icons/add.png',
  },
  {
    id: 3,
    name: 'schedule',
    path: '/icons/schedule.png',
  },
  {
    id: 4,
    name: 'group',
    path: '/icons/group.png',
  },
  {
    id: 5,
    name: 'notification',
    path: '/icons/notifications.png',
  },
  {
    id: 6,
    name: 'search',
    path: '/icons/search.png',
  },
]);
</script>

<style></style>
