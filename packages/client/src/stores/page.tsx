import { SWRResponse } from 'swr';

import { restClient } from '@monorepo/webev-client/src/utils/rest-client';
import { PaginationResult } from '@monorepo/webev-client/src/libs/interfaces/paginationResult';
import { Page } from '@monorepo/webev-client/src/domains/Page';
import { useStaticSWR } from '@monorepo/webev-client/src/stores/use-static-swr';
import { useAuthenticationSWR } from '@monorepo/webev-client/src/stores/use-authentication-swr';

export const useDirectoryId = (initialData?: string | null): SWRResponse<string | null, Error> => {
  return useStaticSWR('directoryId', initialData);
};

export const usePageByPageId = ({ pageId }: { pageId: string }): SWRResponse<Page, Error> => {
  return useAuthenticationSWR(`/pages/${pageId}`, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
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
  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
