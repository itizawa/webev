import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { Page } from '~/interfaces/page';

export const usePageListSWR = (activePage = 1, limit = 9): responseInterface<Page[], Error> => {
  const offset = (activePage - 1) * limit;
  return useSWR(`/pages/list?offset=${offset}&limit=${limit}`, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useFavoritePageListSWR = (activePage = 1, limit = 9): responseInterface<Page[], Error> => {
  const offset = (activePage - 1) * limit;
  return useSWR(`/pages/favorite-list?offset=${offset}&limit=${limit}`, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
