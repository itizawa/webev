import useSWR, { Key, SWRResponse } from 'swr';
import { Fetcher, SWRConfiguration } from 'swr/dist/types';
import { useSession } from 'next-auth/react';

export const useAuthenticationSWR = <Data, Error>(_key: Key, fetcher: Fetcher<Data>, option: SWRConfiguration): SWRResponse<Data, Error> => {
  const { data: session } = useSession();
  const key = session ? _key : null;

  return useSWR(key, fetcher, option);
};
