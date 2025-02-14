<template>
  <header id="header" class="flex flex-row justify-between">
    <div
      id="month"
      class="flex flex-row justify-center gap-1 align-middle md:ml-2"
    >
      <section class="flex justify-center align-middle">
        <div class="flex min-w-6">
          <NavMonth name-icon="chevron-left" @click="emits('prevMonth')" />
          <NavMonth name-icon="chevron-right" @click="emits('nextMonth')">
          </NavMonth>
        </div>
        <section
          class="flex items-center justify-center gap-2 text-base md:text-lg lg:text-3xl"
        >
          <p class="cursor-pointer" @click="emits('clickMonth')">
            {{ dateStore.getCurrentMonthString }}
          </p>
          <p class="cursor-default">
            {{ dateStore.getCurrentYear }}
          </p>
        </section>
      </section>
    </div>
    <!-- SPEND AMOUNT -->
    <div id="totalSpend" class="mr-4">
      <p class="text-sm md:text-base">Total</p>
      <p id="sum" class="cursor-pointer text-end text-2xl">
        {{ subscriptionStore.getTotalExpensesByMonth }} €
      </p>
    </div>
  </header>
  <span ref="headerDays" class="grid w-full grid-cols-7 gap-2">
    <HeaderDays v-if="!props.displayMonth" />
  </span>
</template>

<script lang="ts" setup>
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import NavMonth from "./NavMonth.vue";
import HeaderDays from "../headers/HeaderDays.vue";

const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();

const props = defineProps<{
  displayMonth: boolean;
}>();

const emits = defineEmits([
  "prevMonth",
  "nextMonth",
  "clickMonth",
  "clickYear",
]);
</script>

<style></style>
