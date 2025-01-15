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
    selectedSubscription: null as Subscription | null,
    subscriptionsCurrentMonth: null as Subscription[] | null,
    loading: false,
    selectedDate: null,
  }),
  getters: {
    getTotalExpensesByMonth: (state) => {
      if (!state.subscriptionsCurrentMonth) {
        return 0;
      }
      return state.subscriptionsCurrentMonth.reduce(
        (accumulator, subscription) => accumulator + subscription?.amount,
        0,
      );
    },
    getSubscriptionsByDay: (state) => (date: Dayjs) => {
      // Check if date is provide, and subscriptionsCurrentMonth is not null

      if (!state?.subscriptionsCurrentMonth || !date) {
        return null;
      }
      const result = [];
      // Verify if nextPayements in each subscriptionsCurrentMonth matc the provided date
      for (const subscription of state.subscriptionsCurrentMonth) {
        const matchDate = subscription.nextsPayements.find((element) => {
          const currentDay = dayjs(element).format("YYYY-MM-DD");
          const propsDay = date.format("YYYY-MM-DD");

          return currentDay === propsDay;
        });

        if (matchDate) {
          result.push(subscription);
        }
      }

      return result;
    },
  },
  actions: {
    setSelectedSubscription(subscriptions: Subscription | null) {
      this.selectedSubscription = subscriptions;
    },
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
      this.selectedSubscription = null;
      this.isModalOpen = false;
    },
    setSelectedDate(date: Dayjs) {
      if (this.selectedDate === date.format("YYYY-MM-DD")) {
        this.selectedDate = null;
      } else {
        this.selectedDate = date.format("YYYY-MM-DD");
      }
    },
    /*
    j'envoie les données, dedans il y  a un id ? si non je crée un abonnement, si oui je met à jour l'abonnement


    */
    async updateSubscription(formData: Partial<PostSubscriptions>) {
      if (!this.selectedSubscription?.id) {
        console.error("no id provided");
        /*
      TODO : fermer la modal ici , attendre le retour , avec loading  sur la modal
      */
        return;
      }
      try {
        const updatedSubscription = {
          ...this.selectedSubscription,
          ...formData,
        };

        const resultUpdateSubscription = await useAPI<
          ApiResponse<Subscription>
        >("/user-subscriptions/" + this.selectedSubscription.id, {
          method: "patch",
          body: updatedSubscription,
        });
        if (resultUpdateSubscription?.statusCode !== 200) {
          throw new Error("failed updating subscription");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        this.closeModal();
      }
    },
    async postUserSubscriptions(formData: Partial<PostSubscriptions>) {
      this.loading = true;
      try {
        const resultPostNewUserSubscription = await useAPI<
          ApiResponse<Subscription>
        >("/user-subscriptions", {
          method: "post",
          body: formData,
        });
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
        await useAPI<ApiResponse<{}>>("/user-subscriptions", {
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
