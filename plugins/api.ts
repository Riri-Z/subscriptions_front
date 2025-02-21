export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const {  refresh } = useAuth();

  return {
    provide: {
      api: $fetch.create({
        baseURL: config.public.apiBase,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        async onResponseError({ response }) {
          // Si on reçoit une 401, on tente de refresh
          if (response.status === 401) {
            try {
              await refresh();
              // Après le refresh réussi, on peut réessayer la requête originale
              // TODO: implémenter la logique de retry
            } catch (error) {
              // Si le refresh échoue, on redirige vers login
              await nuxtApp.runWithContext(() => navigateTo('/login'));
            }
          }
        }
      })
    }
  }
})
