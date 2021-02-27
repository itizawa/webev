import { useSWRInfinite, SWRInfiniteResponseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces/paginationResult';

import { Page } from '~/interfaces/page';

export const usePageListSWR = (limit = 9, isFavorite = false): SWRInfiniteResponseInterface<PaginationResult<Page>, Error> => {
  return useSWRInfinite(
    (index) => `/pages/list?status=stocked&page=${index + 1}&limit=${limit}&isFavorite=${isFavorite}`,
    (endpoint) => restClient.apiGet(endpoint).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
