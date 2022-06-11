import useSWR, { SWRResponse } from 'swr';
import { User } from '~/domains/User';
import { restClient } from '~/utils/rest-client';

/**
 * ユーザーに紐づいたページの件数を返すSWR
 * @returns {User} currentUser
 */
export const usePagesCountByUserId = (userId: string): SWRResponse<User, Error> => {
  return useSWR(`/users/${userId}/pages/count`, (endpoint) =>
    restClient.apiGet<{ currentUser: User }>(endpoint).then((result) => User.convertUserFormObject(result.data.currentUser)),
  );
};
