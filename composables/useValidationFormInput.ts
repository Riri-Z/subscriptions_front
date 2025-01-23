export const useValidationFormInput = () => {
  const isError = (value: string, minLength: number): boolean => {
    if (value.length > 0 && value.length < minLength) {
      return true;
    }
    return false;
  };

  return {
    isError,
  };
};
