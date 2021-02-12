import useSWR, { responseInterface } from 'swr';
import { restClient } from '~/utils/rest-client';

import { IPage } from '~/interfaces/page';

export const usePageListSWR = (): responseInterface<IPage[], Error> => {
  return useSWR('/pages/list', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
