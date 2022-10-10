import useSWR, { SWRResponse } from 'swr';
import { Magazine } from '@webev/web/domains/Magazine';
import { PaginationResult } from '@webev/web/libs/interfaces/paginationResult';
import { joinUrl } from '@webev/web/utils/joinUrl';
import { restClient } from '@webev/web/utils/rest-client';

/**
 * Magazineのページネーションを返すSWR
 * @returns {User} currentUser
 */
export const useMagazinePagination = ({
  activePage,
  limit,
  sort,
  searchKeyword,
  isPublic,
}: {
  activePage: number;
  limit: number;
  sort: string;
  searchKeyword?: string;
  isPublic?: boolean;
}): SWRResponse<PaginationResult<Magazine>, Error> => {
  const params = [`page=${activePage}`, `limit=${limit}`, `sort=${sort}`];
  if (searchKeyword) params.push(`&q=${searchKeyword}`);
  if (isPublic !== undefined) params.push(`&isPublic=${isPublic}`);

  const endpoint = joinUrl('/magazines/list', params);

  return useSWR(endpoint, (endpoint) =>
    restClient.apiGet<{ magazinePagination: PaginationResult<Magazine> }>(endpoint).then((result) => {
      return { ...result.data.magazinePagination, docs: result.data.magazinePagination.docs.map((v) => Magazine.convertUserFormObject(v)) };
    }),
  );
};
