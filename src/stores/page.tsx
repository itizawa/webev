import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces/paginationResult';
import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useActivePage = (initialData?: number): responseInterface<number, Error> => {
  return useStaticSWR('activePage', initialData);
};

export const useIsRetrieveFavoritePageList = (initialData?: boolean): responseInterface<boolean, Error> => {
  return useStaticSWR('isRetrieveFavoritePageList', initialData);
};

export const usePageListSWR = (limit = 27): responseInterface<PaginationResult<Page>, Error> => {
  const { data: activePage = 1 } = useActivePage();
  const { data: isRetrieveFavoritePageList = false } = useIsRetrieveFavoritePageList();
  let key = `/pages/list?status=stocked&page=${activePage}&limit=${limit}`;
  if (isRetrieveFavoritePageList) {
    key += `&isFavorite=${isRetrieveFavoritePageList}`;
  }
  return useSWR(key, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
