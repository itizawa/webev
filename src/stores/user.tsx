import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { User } from '~/domains/User';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useAuthenticationSWR('/users/me', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useUserById = ({ id }: { id: string }): SWRResponse<User, Error> => {
  return useSWR(['/users/', id], (endpoint, id) => restClient.apiGet(`${endpoint}${id}`).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
