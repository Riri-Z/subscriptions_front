<template>
  <div class="m-auto text-primary-white-color">
    <p>home</p>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/userStore";
const { status, token } = useAuth();
const userStore = useUserStore();
definePageMeta({
  layout: "dashboard",
});
/*
on init load user information
*/
function getUserInformation() {
  userStore.getUserInformation("30");
}
</script>
