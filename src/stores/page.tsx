import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Page, PageStatus } from '~/domains/Page';
import { useStaticSWR } from '~/stores/use-static-swr';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useActivePage = (initialData?: number): SWRResponse<number, Error> => {
  return useStaticSWR('activePage', initialData);
};

export const usePageStatus = (initialData?: PageStatus[]): SWRResponse<PageStatus[], Error> => {
  return useStaticSWR('pageStatus', initialData);
};

export const useDirectoryId = (initialData?: string | null): SWRResponse<string | null, Error> => {
  return useStaticSWR('directoryId', initialData);
};

export const useSearchKeyWord = (initialData?: string | null): SWRResponse<string | null, Error> => {
  return useStaticSWR('searchKeyWord', initialData);
};

export const useIsSortCreatedAt = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isSortCreatedAt', initialData);
};

export const usePageByPageId = ({ pageId }: { pageId: string }): SWRResponse<Page, Error> => {
  return useAuthenticationSWR(`/pages/${pageId}`, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const usePageListSWR = (limit = 27): SWRResponse<PaginationResult<Page>, Error> => {
  const { data: activePage = 1 } = useActivePage();
  const { data: status = [PageStatus.PAGE_STATUS_STOCK] } = usePageStatus();
  const { data: directoryId } = useDirectoryId();
  const { data: searchKeyWord } = useSearchKeyWord();
  const { data: isSortCreatedAt = false } = useIsSortCreatedAt();

  const sort = isSortCreatedAt ? 'createdAt' : '-createdAt';

  return useAuthenticationSWR(
    ['/pages/list', status, activePage, limit, sort, searchKeyWord, directoryId],
    (endpoint, status, page, limit, sort, searchKeyWord, directoryId) =>
      restClient
        .apiGet(
          `${endpoint}?${status.map((v: PageStatus) => `status[]=${v}&`).join('')}&page=${page}&limit=${limit}&sort=${sort}${
            searchKeyWord != null ? `&q=${searchKeyWord}` : ``
          }${directoryId != null ? `&directoryId=${directoryId}` : ``}`,
        )
        .then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};

export const usePageNotBelongDirectory = ({
  activePage,
  searchKeyWord,
}: {
  activePage: number;
  searchKeyWord: string;
}): SWRResponse<PaginationResult<Page>, Error> => {
  return useAuthenticationSWR(
    ['/pages/list', activePage, searchKeyWord],
    (endpoint, page, searchKeyWord) =>
      restClient
        .apiGet(
          `${endpoint}?status[]=stocked&status[]=archived&directoryId=null&sort=-createdAt&page=${page}${searchKeyWord != null ? `&q=${searchKeyWord}` : ``}`,
        )
        .then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};

export const useAllPages = ({ activePage, searchKeyWord }: { activePage: number; searchKeyWord: string }): SWRResponse<PaginationResult<Page>, Error> => {
  return useAuthenticationSWR(
    ['/pages/list', activePage, searchKeyWord],
    (endpoint, page, searchKeyWord) =>
      restClient
        .apiGet(`${endpoint}?status[]=stocked&status[]=archived&limit=30&page=${page}${searchKeyWord != null ? `&q=${searchKeyWord}` : ``}`)
        .then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
