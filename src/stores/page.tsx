import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/libs/interfaces/paginationResult';
import { Page } from '~/domains/Page';

export const usePageByPageId = ({ pageId }: { pageId: string }): SWRResponse<Page, Error> => {
  return useSWR(`/pages/${pageId}`, (endpoint: string) => restClient.apiGet<Page>(endpoint).then((result) => result.data), {
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
  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<PaginationResult<Page>>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
