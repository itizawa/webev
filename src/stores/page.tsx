import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/libs/interfaces/paginationResult';
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
  const endpoint = `/pages/list?${status.map((v: PageStatus) => `status[]=${v}&`).join('')}page=${activePage}&limit=${limit}&sort=${sort}${
    searchKeyWord ? `&q=${searchKeyWord}` : ``
  }${directoryId ? `&directoryId=${directoryId}` : ``}`;

  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const usePageNotBelongDirectory = ({
  activePage,
  searchKeyWord,
}: {
  activePage: number;
  searchKeyWord: string;
}): SWRResponse<PaginationResult<Page>, Error> => {
  const endpoint = `/pages/list?status[]=stocked&status[]=archived&directoryId=null&sort=-createdAt&page=${activePage}${
    searchKeyWord != null ? `&q=${searchKeyWord}` : ``
  }`;
  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
