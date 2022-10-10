import useSWR, { SWRResponse } from 'swr';
import { User } from '@webev/web/domains/User';
import { restClient } from '@webev/web/utils/rest-client';

/**
 * 現在ログインしているユーザーを返すswr
 * @returns {User} currentUser
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useSWR(
    '/users/me',
    (endpoint) => restClient.apiGet<{ currentUser: User }>(endpoint).then((result) => User.convertUserFormObject(result.data.currentUser)),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateIfStale: false,
    },
  );
};
