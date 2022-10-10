import useSWR, { SWRResponse } from 'swr';
import { restClient } from '@webev/web/utils/rest-client';

/**
 * ユーザーに紐づいたページの件数を返すSWR
 * @returns {User} currentUser
 */
export const usePagesCountByUserId = (userId?: string): SWRResponse<number, Error> => {
  return useSWR(userId ? `/users/${userId}/pages/count` : null, (endpoint) =>
    restClient.apiGet<{ count: number }>(endpoint).then((result) => result.data.count),
  );
};
