import useSWR, { Key, SWRResponse, mutate, cache } from 'swr';
import { Fetcher } from 'swr/dist/types';

export const useStaticSWR = <Data, Error>(key: Key, updateData?: Data | Fetcher<Data>, initialData?: Data | Fetcher<Data>): SWRResponse<Data, Error> => {
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
