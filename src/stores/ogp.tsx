import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';
import { Ogp } from '~/domains/Ogp';

export const useOgp = ({ url }: { url: string }): SWRResponse<Ogp, Error> => {
  return useAuthenticationSWR(`ogp?url=${url}`, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
