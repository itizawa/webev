import useSWR, { Key, SWRResponse, mutate } from 'swr';
import { Fetcher } from 'swr/dist/types';

export const useStaticSWR = <Data, Error>(key: Key, updateData?: Data | Fetcher<Data>): SWRResponse<Data, Error> => {
  if (!updateData) {
    mutate(key, updateData);
  }

  return useSWR(key, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
