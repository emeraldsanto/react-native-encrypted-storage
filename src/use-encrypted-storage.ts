import { useCallback } from 'react';
import useSWR from 'swr';
import { EncryptedStorage } from './encrypted-storage';

/**
 * Provides a stateful value and scoped functions
 * to interact with the storage engine for the given
 * key.
 *
 * @param {string} key - The key to retrieve from and store to
 */
export function useEncryptedStorage(key: string) {
  const { data, error, mutate, isValidating } = useSWR<string | null, Error>(
    key,
    (x: string) => EncryptedStorage.getItem(x)
  );

  const setItem = useCallback(async (value: string) => {
    await mutate(
      EncryptedStorage.setItem(key, value).then(() => value)
    );
  }, [key, mutate]);

  const removeItem = useCallback(async () => {
    mutate(
      EncryptedStorage.removeItem(key).then(() => null)
    );
  }, [key, mutate]);

  return {
    error,
    loading: data == null && isValidating,
    removeItem,
    setItem,
    value: data,
  }
}
