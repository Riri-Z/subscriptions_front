import type { UseFetchOptions } from "#app";
const { $api } = useNuxtApp()
export function useAPI<T>(
  url: string,
  options?: UseFetchOptions<T> & { method?: string },
) {
  const { token } = useAuth();

  if (!token?.value) {
    console.error("missing Bearer token")
    return
  }

  return $api(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
  })
}
