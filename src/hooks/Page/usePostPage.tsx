import { useCallback } from 'react';
import { usePagePagination } from '.';
import { Page } from '~/domains/Page';
import { restClient } from '~/utils/rest-client';
import { generateMockPage } from '~/mock/generateMockPage';

/**
 * Pageを保存するhooks
 */
export const usePostPage = (): { postPage: (url: string) => void } => {
  const { pagePagination, activePage, mutatePagePagination } = usePagePagination();

  const postPage = useCallback(
    async (url: string) => {
      if (!pagePagination) return;

      mutatePagePagination(restClient.apiPost('/pages', { url }).then(), {
        optimisticData: {
          ...pagePagination,
          docs:
            activePage === 1
              ? [generateMockPage({ title: '...Loading', updatedAt: new Date() }), ...pagePagination.docs]
              : pagePagination.docs,
        },
        populateCache: ({ data: page }: { data: Page }, pagePagination) => {
          return {
            ...pagePagination,
            docs: activePage === 1 ? [page, ...pagePagination.docs] : pagePagination.docs,
          };
        },
        rollbackOnError: true,
        revalidate: false,
      });
    },
    [activePage, mutatePagePagination, pagePagination],
  );

  return { postPage };
};
