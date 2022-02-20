import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains/User';

/**
 * 現在ログインしているユーザーを返すswr
 * @returns {User} currentUser
 */
export const useCurrentUser = (): SWRResponse<User, Error> => {
  return useSWR('/users/me', {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
