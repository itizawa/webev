import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Scrap } from '~/domains/Scrap';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useScrapById = ({ scrapId }: { scrapId: string }): SWRResponse<Scrap, Error> => {
  const endpoint = scrapId != null ? `/scraps/${scrapId}` : null;

  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
