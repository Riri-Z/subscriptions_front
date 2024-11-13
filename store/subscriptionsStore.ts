import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { defineStore } from "pinia";
import type {
  ApiResponse,
  PostSubscriptions,
  Subscription,
  SubscriptionsStore,
} from "~/types/store/subscriptionsStore";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: (): SubscriptionsStore => ({
    isModalOpen: false,
    isOpenDetails: false,
    subscriptions: null as Subscription[] | null,
    subscriptionsCurrentMonth: null as Subscription[] | null,
    loading: false,
    selectedDate: null,
  }),
  getters: {
    getSubscriptionsByDay: (state) => (date: Dayjs) => {
      // Check if date is provide, and subscriptionsCurrentMonth is not null
      if (!state?.subscriptionsCurrentMonth || !date) {
        return null;
      }
      const result = [];
      // Verify if nextPayements in each subscriptionsCurrentMonth matc the provided date
      for (const subscription of state.subscriptionsCurrentMonth) {
        const matchDate = subscription.nextsPayements.find(
          (element) =>
            dayjs(element).format("YYYY-MM-DD") === date.format("YYYY-MM-DD"),
        );

        if (matchDate) result.push(subscription);
      }
      return result;
    },
  },
  actions: {
    openDetails() {
      this.isOpenDetails = true;
    },
    closeDetails() {
      this.isOpenDetails = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setSelectedDate(date: Dayjs) {
      if (this.selectedDate === date.format("YYYY-MM-DD")) {
        this.selectedDate = null;
      } else {
        this.selectedDate = date.format("YYYY-MM-DD");
      }
    },
    async postUserSubscriptions(formData: Partial<PostSubscriptions>) {
      this.loading = true;

      try {
        const resultPostNewUserSubscription = await useAPI<ApiResponse>(
          "/user-subscriptions",
          {
            method: "post",
            body: formData,
          },
        );
        if (resultPostNewUserSubscription?.statusCode !== 201) {
          throw new Error("failed creating new subscription");
        }
        // close toast up , with succeed message
        return resultPostNewUserSubscription?.body;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getAllSubscriptions() {
      this.loading = true;
      try {
        const subscriptions = await useAPI<ApiResponse>("/user-subscriptions", {
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getSubscriptionsMonthly(date: Date | string) {
      this.loading = true;
      const url = "/user-subscriptions/" + date;
      try {
        const subscriptionsCurrentMonth = await useAPI<Subscription[]>(url, {
          method: "GET",
        });
        if (subscriptionsCurrentMonth) {
          this.subscriptionsCurrentMonth = subscriptionsCurrentMonth;
          return true;
        }
        return false;
      } catch (error) {
        this.subscriptionsCurrentMonth = [];
        console.error(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
