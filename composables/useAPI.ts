import type { UseFetchOptions } from "#app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T> & { method?: string },
) {
  return useFetch(url, {
    ...options,
    method: options?.method,
    $fetch: useNuxtApp().$api,
  });
}
