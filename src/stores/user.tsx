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

export const useApiToken = (): SWRResponse<User, Error> => {
  return useAuthenticationSWR('/users/api-token', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useUserById = ({ userId }: { userId?: string }): SWRResponse<User, Error> => {
  const endpoint = userId != null ? `/users/${userId}` : null;
  return useSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
