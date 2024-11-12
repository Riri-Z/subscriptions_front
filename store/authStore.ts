import type { RegisterResponse } from "~/interfaces/auth.interface";
import type { ApiResponse } from "~/types/store/subscriptionsStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthentified: false,
  }),

  getters: {},
  actions: {
    async registerUser(
      name: string,
      username: string,
      password: string,
      email: string,
    ) {
      //TODO: Need to remove this,  it's should not be mandotory
      const roles = ["USER"];

      const res: ApiResponse<RegisterResponse> | null = await useAPI("/users", {
        method: "POST",
        body: {
          name,
          username,
          password,
          email,
          roles,
        },
      });

      //TODO : display toast or anything to say to login with the newly created account at /login
      if (res?.statusCode === 201) {
        navigateTo("/login");
      } else {
        console.error("error", res);
      }
    },
  },
});
