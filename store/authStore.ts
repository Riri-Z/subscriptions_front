import type { LoginResponse } from "~/interfaces/login.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    jwtToken: null,
  }),

  getters: {},
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const { data: jwt } = await useAPI<LoginResponse>(() => "/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        if (jwt.value?.body?.access_token) {
          localStorage.setItem("jwt", jwt.value?.body?.access_token);
          navigateTo("/dashboard");
        }
      } catch (e) {
        console.error("error loginUser", e);
      }
    },
  },
});
