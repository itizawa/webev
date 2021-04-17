import { SWRResponse } from 'swr';
import urljoin from 'url-join';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Page, PageStatus } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useActivePage = (initialData?: number): SWRResponse<number, Error> => {
  return useStaticSWR('activePage', initialData);
};

export const usePageStatus = (initialData?: PageStatus): SWRResponse<PageStatus, Error> => {
  return useStaticSWR('pageStatus', initialData);
};

export const useIsRetrieveFavoritePageList = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isRetrieveFavoritePageList', initialData);
};

export const useDirectoryId = (initialData?: string): SWRResponse<string, Error> => {
  return useStaticSWR('directoryId', initialData);
};

export const useIsSortCreatedAt = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isSortCreatedAt', initialData);
};

export const usePageListSWR = (limit = 27): SWRResponse<PaginationResult<Page>, Error> => {
  const { data: activePage = 1 } = useActivePage();
  const { data: status = PageStatus.PAGE_STATUS_STOCK } = usePageStatus();
  const { data: isRetrieveFavoritePageList = false } = useIsRetrieveFavoritePageList();
  const { data: directoryId } = useDirectoryId();
  const { data: isSortCreatedAt = false } = useIsSortCreatedAt();

  const sort = isSortCreatedAt ? 'createdAt' : '-createdAt';

  return useAuthenticationSWR(
    ['/pages/list', status, activePage, limit, sort, isRetrieveFavoritePageList, directoryId],
    (endpoint, status, page, limit, sort, isFavorite, directoryId) =>
      restClient
        .apiGet(
          urljoin(
            endpoint,
            `?status=${status}`,
            `?page=${page}`,
            `&limit=${limit}`,
            `&sort=${sort}`,
            isFavorite ? `&isFavorite=${isFavorite}` : ``,
            directoryId ? `&directoryId=${directoryId}` : ``,
          ),
        )
        .then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
