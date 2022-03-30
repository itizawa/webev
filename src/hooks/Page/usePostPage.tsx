import { useCallback } from 'react';
import { usePagePagination } from '.';
import { restClient } from '~/utils/rest-client';

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
