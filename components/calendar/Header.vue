<template>
  <div>
    <header
      id="header"
      class="mb-4 flex h-12 flex-row justify-between text-light"
    >
      <div
        id="month"
        class="flex flex-row justify-center gap-1 align-middle md:ml-2"
      >
        <section class="flex justify-center gap-2 align-middle">
          <div class="flex min-w-6 items-center">
            <NavMonth name-icon="chevron-left" @click="emits('prevMonth')" />
            <NavMonth name-icon="chevron-right" @click="emits('nextMonth')" />
          </div>
          <section
            class="flex items-center justify-center gap-2 text-base md:text-lg lg:text-3xl"
          >
            <CardsTooltip
              :position="'bottom'"
              :content="$t(tooltipMessages.calendar.header.month)"
            >
              <p
                v-if="!displayYear"
                class="cursor-pointer"
                @click="emits('clickMonth')"
              >
                {{
                  capitalized(
                    $t(
                      `dashboard.calendar.months.${dateStore.getCurrentMonthString.toLowerCase()}`,
                    ),
                  )
                }}
              </p>
            </CardsTooltip>
            <CardsTooltip
              v-if="!yearsRange"
              :position="'bottom'"
              :content="$t(tooltipMessages.calendar.header.year)"
            >
              <p class="cursor-pointer" @click="emits('clickYear')">
                {{ dateStore.getCurrentYear }}
              </p>
            </CardsTooltip>
            <p v-else>{{ yearsRange }}</p>
          </section>
        </section>
      </div>
      <!-- SPEND AMOUNT -->
      <div
        v-if="!(displayMonth || displayYear)"
        id="totalSpend"
        class="md:mr-4"
      >
        <p class="text-sm md:text-base">{{ $t("dashboard.calendar.total") }}</p>

        <p
          id="sum"
          class="ml-auto cursor-pointer text-end font-semibold md:text-3xl"
        >
          {{ computeTotalExpense }} €
        </p>
      </div>
    </header>
    <span
      v-if="!(props.displayMonth || props.displayYear)"
      ref="headerDays"
      class="grid w-full grid-cols-7 gap-2"
    >
      <HeaderDays />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useDateStore } from "~/store/dateStore";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import NavMonth from "./NavMonth.vue";
import HeaderDays from "../headers/HeaderDays.vue";
import { tooltipMessages } from "~/utils/constants/tooltip-messages";

const subscriptionStore = useSubscriptionsStore();
const dateStore = useDateStore();

const props = defineProps<{
  displayMonth: boolean;
  displayYear: boolean;
  yearsRange: string | false;
  isLoading: boolean;
}>();

const emits = defineEmits([
  "prevMonth",
  "nextMonth",
  "clickMonth",
  "clickYear",
]);

/**
 * Compute total expenses for the currentMonth
 */
const computeTotalExpense = computed(() => {
  return subscriptionStore.computeTotalExpensesForCurrentMonth(
    dateStore.getCurrentMonth,
    subscriptionStore.subscriptionsCurrentMonth,
  );
});
</script>
