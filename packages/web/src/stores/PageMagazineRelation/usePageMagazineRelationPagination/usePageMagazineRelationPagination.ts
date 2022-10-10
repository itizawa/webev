import useSWR, { SWRResponse } from 'swr';
import { PageMagazineRelation } from '@webev/web/domains/PageMagazineRelation';
import { PaginationResult } from '@webev/web/libs/interfaces/paginationResult';
import { joinUrl } from '@webev/web/utils/joinUrl';
import { restClient } from '@webev/web/utils/rest-client';

/**
 * PageMagazineRelationのページネーションを返すSWR
 * @returns {User} currentUser
 */
export const usePageMagazineRelationPagination = ({
  pageId,
  magazineId,
}: {
  pageId?: string;
  magazineId?: string;
}): SWRResponse<PaginationResult<PageMagazineRelation>, Error> => {
  const params = [];
  if (pageId) params.push(`&pageId=${pageId}`);
  if (magazineId) params.push(`&magazineId=${magazineId}`);

  const endpoint = joinUrl('/page-magazine-relations/list', params);

  return useSWR(endpoint, (endpoint) =>
    restClient.apiGet<{ pageMagazineRelationPagination: PaginationResult<PageMagazineRelation> }>(endpoint).then((result) => {
      return {
        ...result.data.pageMagazineRelationPagination,
        docs: result.data.pageMagazineRelationPagination.docs.map((v) => PageMagazineRelation.convertUserFormObject(v)),
      };
    }),
  );
};
