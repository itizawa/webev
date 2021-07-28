import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Scrap } from '~/domains/Scrap';

export const useScrapById = ({ scrapId }: { scrapId: string }): SWRResponse<Scrap, Error> => {
  const endpoint = scrapId != null ? `/scraps/${scrapId}` : null;

  return useSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
