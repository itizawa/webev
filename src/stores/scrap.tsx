import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Page } from '~/domains/Page';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useScrapById = ({ scrapId }: { scrapId: string }): SWRResponse<PaginationResult<Page>, Error> => {
  const endpoint = scrapId != null ? `/scraps/${scrapId}` : null;

  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
