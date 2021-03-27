import useSWR, { Key, SWRResponse } from 'swr';
import { Fetcher, SWRConfiguration } from 'swr/dist/types';
import { useSession } from 'next-auth/client';

export const useAuthenticationSWR = <Data, Error>(_key: Key, fetcher: Fetcher<Data>, option: SWRConfiguration): SWRResponse<Data, Error> => {
  const [session] = useSession();
  const key = session == null ? null : _key;

  return useSWR(key, fetcher, option);
};
