import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Scrap } from '~/domains/Scrap';

export const useScrapById = ({ scrapId }: { scrapId: string }): SWRResponse<Scrap, Error> => {
  const endpoint = scrapId != null ? `/scraps/${scrapId}` : null;

  return useSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useScrapList = ({ activePage, searchKeyWord }: { activePage: number; searchKeyWord: string }): SWRResponse<PaginationResult<Scrap>, Error> => {
  const limit = 30;

  return useSWR(
    ['/scraps/list', activePage, limit, searchKeyWord],
    (endpoint, page, limit, searchKeyWord) =>
      restClient.apiGet(`${endpoint}?page=${page}&limit=${limit}&${searchKeyWord != null ? `&q=${searchKeyWord}` : ``}`).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
