import type { UseFetchOptions } from "#app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T> & { method?: string },
) {
  const { token } = useAuth();

  if (!token?.value) {
    navigateTo("/login");
    return null;
  }

  return useFetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    ...options,
    method: options?.method,
    $fetch: useNuxtApp().$api,
    onResponseError: (error) => {
      console.error("API Error:", error);
    },
  });
}
