import { useSWRInfinite, SWRResponse, SWRInfiniteResponse } from 'swr';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces/paginationResult';

import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useActivePage = (initialData?: number): SWRResponse<number, Error> => {
  return useStaticSWR('activePage', initialData);
};

export const useIsRetrieveFavoritePageList = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isRetrieveFavoritePageList', initialData);
};

export const usePageListSWR = (limit = 27): SWRInfiniteResponse<PaginationResult<Page>, Error> => {
  const { data: isRetrieveFavoritePageList = false } = useIsRetrieveFavoritePageList();

  return useSWRInfinite(
    (index) => `/pages/list?status=stocked&page=${index + 1}&limit=${limit}&isFavorite=${isRetrieveFavoritePageList}`,
    (endpoint) => restClient.apiGet(endpoint).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};

// export const usePageListSWR = (limit = 27): responseInterface<PaginationResult<Page>, Error> => {
//   const { data: activePage = 1 } = useActivePage();
//   const { data: isRetrieveFavoritePageList = false } = useIsRetrieveFavoritePageList();
//   let key = `/pages/list?status=stocked&page=${activePage}&limit=${limit}`;
//   if (isRetrieveFavoritePageList) {
//     key += `&isFavorite=${isRetrieveFavoritePageList}`;
//   }
//   return useSWR(key, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: true,
//   });
// };
