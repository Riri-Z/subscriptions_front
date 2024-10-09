import { defineStore } from "pinia";
import {
  type ApiResponse,
  type Subscription,
} from "~/types/store/subscriptionsStore";

export const useSubscriptionsStore = defineStore("subscriptions", {
  state: () => ({
    subscriptions: null as Subscription[] | null,
    loading: false,
    error: false,
  }),
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
  },
});
