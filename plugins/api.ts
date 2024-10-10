export default defineNuxtPlugin((nuxtApp) => {

  const config = useRuntimeConfig();
  const { token } = useAuth();
  const tokenValue = token?.value
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest: ({ request, options, error }) => {
      if (tokenValue) {
        const headers = options.headers || {};
        if (Array.isArray(headers)) {
          headers.push(["Authorization", tokenValue]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", tokenValue);
        } else {
          headers.Authorization = tokenValue;
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
  /*     if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("login"));
      } */
      console.error("Erreur de réponse:", error);
    },
  });
  return {
    provide: {
      api,
    },
  };
});
