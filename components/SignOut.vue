<template>
  <button class="flex items-center text-white lg:h-28" @click="handleSignOut">
    <div class="mx-auto flex flex-row gap-1">
      <NuxtImg
        :key="icon.id"
        class=""
        :src="icon.path"
        :alt="icon.name"
        width="16"
        height="16"
      />
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
