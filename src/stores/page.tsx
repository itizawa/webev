import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useOffsetPage = (initialData?: number): responseInterface<number | null, Error> => {
  return useStaticSWR('offsetPage', initialData);
};

export const usePageListSWR = (): responseInterface<Page[], Error> => {
  const { data: offsetPage } = useOffsetPage();
  return useSWR(`/pages/list?offset=${offsetPage || 0}`, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useFavoritePageListSWR = (): responseInterface<Page[], Error> => {
  const { data: offsetPage } = useOffsetPage();
  return useSWR(`/pages/favorite-list?limit=${offsetPage || 0}`, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
