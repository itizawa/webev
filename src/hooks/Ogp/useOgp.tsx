import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Ogp } from '~/domains/Ogp';

/**
 * urlをもとにOGPを取得するSWR
 * @param url
 */
export const useOgp = (url?: string): SWRResponse<Ogp, Error> => {
  const key = url ? `ogp?url=${url}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet<Ogp>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
