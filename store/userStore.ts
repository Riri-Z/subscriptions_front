import { defineStore } from "pinia";
interface ApiResponse {
  status: string;
  result: UserStore;
}

interface UserStore {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string;
  userSubscriptions: UserSubscription[];
}

interface UserSubscription {
  id: number;
  startDate: string;
  endDate: string;
  renewalDate: string;
  amount: number;
  billingCycle: string;
  status: string;
  subscription: {
    id: number;
    name: string;
  };
}
export const useUserStore = defineStore("user", {
  // store options
  state: () => ({
    user: null as UserStore | null,
    loading: false,
    error: false,
  }),
  getters: {
    getUserName: (state): string | undefined => state.user?.username,
    getUserEmail: (state): string | undefined => state.user?.email,
    getUserId: (state): number | undefined => state.user?.id,
    getUser: (state): UserStore | null => state.user,
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async getUserInformation(id: string) {
      try {
        this.loading = true;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + "JWT",
          },
        };
        const { data, error } = await useFetch<ApiResponse>(
          "http://localhost:8080/auth/user/" + id,
          {
            method: "GET",
            headers: options.headers,
          },
        );

        console.log("data", data);
        console.log(error);
        if (data?.value?.result) {
          const user: UserStore | null = data?.value?.result
            ? data.value.result
            : null;
          console.log("=========USER==========", user);
          this.user = user;
        } else {
          throw new Error("data has no value : " + JSON.stringify(data));
        }
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
});
