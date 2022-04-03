import { useCallback } from 'react';
import { restClient } from '@monorepo/webev-client/src/utils/rest-client';
import { usePagePagination } from '.';

/**
 * Pageを保存するhooks
 */
export const usePostPage = () => {
  const { pagePagination, mutatePagePagination } = usePagePagination();

  /**
   * @param {string} url
   */
  const postPage = useCallback(
    async (url: string) => {
      if (!pagePagination) return;
      await restClient.apiPost('/pages', { url });
      mutatePagePagination();
    },
    [mutatePagePagination, pagePagination],
  );

  return { postPage };
};
