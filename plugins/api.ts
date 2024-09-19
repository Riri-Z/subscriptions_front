export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest: ({ request, options, error }) => {
      console.log("API call:", options.method, request);
      console.log("Headers:", options.headers);
      if (session.value?.token) {
        const headers = options.headers || {};
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${session.value?.token}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${session.value?.token}`);
        } else {
          headers.Authorization = `Bearer ${session.value?.token}`;
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("connexion"));
      }
    },
  });
  return {
    provide: {
      api,
    },
  };
});
