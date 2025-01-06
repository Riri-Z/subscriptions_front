<template>
  <button
    class="fex-col flex h-16 rounded-xl bg-slate-800 p-2"
    :class="{
      'bg-green-700': isSelectedDay,
      'bg-slate-500': day !== null,
    }"
    @click="handleClickDay"
  >
    <p>{{ day }}</p>
    <!-- TODO : COMPONENT DISPLAY ICON CURRENT SUBSCRIPTION -->
    <section class="flex flex-row flex-wrap">
      <span
        v-if="subscriptionActive"
        v-for="subscription in subscriptionActive"
      >
        <p>
          {{ subscription?.subscription?.name?.[0] }}
        </p>
      </span>
    </section>
  </button>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { Subscription } from "~/types/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentDate: Dayjs | null | 0;
}>();

const completeDate: Ref<string | null> = ref(null);

const subscriptionActive: Ref<Subscription[] | null> = ref(null);

//TODO : Move this to calendar component, and in the store when we getSubscriptionsMonthly, update store state to save the date with their subscription , and pass them by props to calendarDAY
onMounted(() => {
  if (props.sourceDate && props.day) {
    completeDate.value = props.sourceDate
      .set("date", props.day)
      .format("YYYY-MM-DD");
  } else {
    console.error("missing sourceDate & day props");
    return;
  }
  if (completeDate.value) {
    const res = subscriptionStore.getSubscriptionsByDay(
      dayjs(completeDate.value),
    );
    if (res && res?.length > 0) {
      subscriptionActive.value = res;
    }
  }
});

// Logic to check if current day is the selected one
const isSelectedDay = computed(() => {
  if (props.currentDate && subscriptionStore.selectedDate) {
    return (
      props.currentDate &&
      props.currentDate.format("YYYY-MM-DD") == subscriptionStore.selectedDate
    );
  }
});

// Select day
function handleClickDay() {
  if (props.currentDate) {
    subscriptionStore.setSelectedDate(props.currentDate);
    subscriptionStore.openDetails();
  } else {
    return console.info("No date available");
  }
}
</script>
