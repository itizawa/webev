import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { User } from '~/domains/User';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useUserInfo = (): SWRResponse<User, Error> => {
  return useAuthenticationSWR('/users/me', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
