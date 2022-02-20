import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains/User';
import { restClient } from '~/utils/rest-client';

/**
 * 現在ログインしているユーザーを返すswr
 * @returns {User} currentUser
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useSWR('/users/me', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
