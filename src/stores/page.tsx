import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces/paginationResult';
import { Page } from '~/interfaces/page';

export const usePageListSWR = (activePage = 1, limit = 9, isFavorite = false): responseInterface<PaginationResult<Page>, Error> => {
  let key = `/pages/list?status=stocked&page=${activePage}&limit=${limit}`;
  if (isFavorite) {
    key += `&isFavorite=${isFavorite}`;
  }
  return useSWR(key, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
