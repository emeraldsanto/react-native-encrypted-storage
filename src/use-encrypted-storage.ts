import { useCallback } from 'react';
import useSWR from 'swr';
import { EncryptedStorage } from './encrypted-storage';

export function useEncryptedStorage(key: string) {
  const { data, error, mutate, isValidating } = useSWR<string | null>(key, (x: string) => EncryptedStorage.getItem(x));

  const setItem = useCallback((value: string) => {
    void mutate(
      EncryptedStorage.setItem(key, value).then(() => value)
    );
  }, [key, mutate]);

  const removeItem = useCallback(() => {
    void mutate(
      EncryptedStorage.removeItem(key).then(() => null)
    );
  }, [key, mutate]);

  return {
    error,
    loading: isValidating,
    removeItem,
    setItem,
    value: data,
  }
}
