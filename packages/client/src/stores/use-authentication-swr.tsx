import useSWR, { Key, SWRResponse } from 'swr';
import { Fetcher, SWRConfiguration } from 'swr/dist/types';

export const useAuthenticationSWR = <Data, Error>(key: Key, fetcher: Fetcher<Data>, option: SWRConfiguration): SWRResponse<Data, Error> => {
  return useSWR(key, fetcher, option);
};
