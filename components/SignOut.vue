<template>
  <button
    class="flex w-full justify-center text-white"
    @click="() => signOut({ callbackUrl: 'login' })"
  >
    <div class="flex flex-row">
      <NuxtImg
        class="m-auto"
        :key="icon.id"
        :src="icon.path"
        :alt="icon.name"
        width="20"
        height="20"
      />
      <p class="text-sm">&nbsp; Se déconnecter</p>
    </div>
  </button>
</template>

<script lang="ts" setup>
const { signOut } = useAuth();

interface Icon {
  id: number;
  name: string;
  path: string;
}

const icon = ref<Icon>({
  id: 1,
  name: "logout",
  path: "/icons/logout.png",
});
</script>
