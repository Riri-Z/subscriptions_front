export const useSubscriptions = () => {
  const subscriptions: Ref<Subscription[]> = ref([]);
  const error = ref([]);
  const loading = ref(null);

  return {
    subscriptions,
    error,
    loading,
  };
};
