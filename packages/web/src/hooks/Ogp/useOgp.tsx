import useSWR, { SWRResponse } from 'swr';

import { restClient } from '@webev/web/utils/rest-client';
import { Ogp } from '@webev/web/domains/Ogp';

/**
 * urlをもとにOGPを取得するSWR
 * @param url
 */
export const useOgp = (url?: string): SWRResponse<Ogp, Error> => {
  const key = url ? `/ogps?url=${url}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet<{ ogp: Ogp }>(endpoint).then((result) => result.data.ogp), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
