import useSWR, { keyInterface, responseInterface, mutate, cache } from 'swr';

export const useStaticSWR = <Data, Error>(key: keyInterface, updateData?: Data, initialData?: Data): responseInterface<Data, Error> => {
  if (updateData == null) {
    if (!cache.has(key) && initialData != null) {
      mutate(key, initialData, false);
    }
  } else {
    mutate(key, updateData);
  }

  return useSWR(key, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
