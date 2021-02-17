import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { Page } from '~/interfaces/page';

export const usePageListSWR = (): responseInterface<Page[], Error> => {
  return useSWR('/pages/list', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useFavoritePageListSWR = (): responseInterface<Page[], Error> => {
  return useSWR('/pages/favorite-list', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
