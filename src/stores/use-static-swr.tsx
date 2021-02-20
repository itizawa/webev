import useSWR, { keyInterface, responseInterface, mutate, cache } from 'swr';
import { fetcherFn } from 'swr/dist/types';

export const useStaticSWR = <Data, Error>(
  key: keyInterface,
  updateData?: Data | fetcherFn<Data>,
  initialData?: Data | fetcherFn<Data>,
): responseInterface<Data | null, Error> => {
  if (updateData == null) {
    if (!cache.has(key) && initialData != null) {
      mutate(key, initialData, false);
    }
  } else {
    mutate(key, updateData);
  }

  return useSWR(key, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
