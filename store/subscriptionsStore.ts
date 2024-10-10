import { defineStore } from "pinia";
import {
  type ApiResponse,
  type Subscription,
} from "~/types/store/subscriptionsStore";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: () => ({
    subscriptions: null as Subscription[] | null,
    subscriptionsCurrentMonth: null as Subscription[] | null,
    loading: false,
    error: false,
  }),
  getters: {},
  actions: {
    async getAllSubscriptions() {
      this.loading = true;
      this.error = false;
      try {
        const subscriptions = await useAPI<ApiResponse>("/user-subscriptions", {
          method: "GET",
        });
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getSubscriptionsMonthly(date: Date | string) {
      this.loading = true;
      this.error = false;
      const url = "/user-subscriptions/" + date;
      try {
        const subscriptionsCurrentMonth = await useAPI<ApiResponse>(url, {
          method: "POST",
        });
        if (subscriptionsCurrentMonth) {
          this.subscriptionsCurrentMonth = subscriptionsCurrentMonth;
        }
      } catch (error) {
        this.subscriptionsCurrentMonth = [];
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
