export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest: ({ request, options, error }) => {},
    async onResponseError({ response, error }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("login"));
      }
      console.error("Erreur de réponse:", error);
    },
  });
  return {
    provide: {
      api,
    },
  };
});
