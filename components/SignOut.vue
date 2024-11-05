<template>
  <button class="flex w-full items-center text-white" @click="handleSignOut">
    <div class="mx-auto flex flex-row gap-1">
      <NuxtImg
        :key="icon.id"
        class=""
        :src="icon.path"
        :alt="icon.name"
        width="20"
        height="20"
      />
      <p class="text-sm">&nbsp;Quitter</p>
    </div>
  </button>
</template>

<script lang="ts" setup>
const { signOut } = useAuth();

async function handleSignOut() {
  try {
    return await signOut({ callbackUrl: "/login" });
  } catch (error) {
    console.error(error);
    navigateTo("./login");
  }
}

interface Icon {
  id: number;
  name: string;
  path: string;
}

const icon = ref<Icon>({
  id: 1,
  name: "logout",
  path: "/icons/logout.svg",
});
</script>
