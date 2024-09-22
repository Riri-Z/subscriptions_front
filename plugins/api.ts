export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest: ({ request, options, error }) => {
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
      if (error) {
        console.error(
          "Une erreur est survenue avant l'envoi de la requête:",
          error,
        );
        // Vous pouvez ici gérer l'erreur, par exemple en la journalisant
      }
    },
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
