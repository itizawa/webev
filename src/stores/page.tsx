import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces/paginationResult';
import { Page } from '~/interfaces/page';

export const usePageListSWR = (activePage = 1, limit = 9, isFavorite = false): responseInterface<PaginationResult<Page>, Error> => {
  return useSWR(
    `/pages/list?status=stocked&page=${activePage}&limit=${limit}&isFavorite=${isFavorite}`,
    (endpoint) => restClient.apiGet(endpoint).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
