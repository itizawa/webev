import { useCallback, useState } from 'react';
import { usePagePagination } from '.';
import { Page } from '~/domains/Page';
import { restClient } from '~/utils/rest-client';

/**
 * Archiveを切り替える
 */
export const useSwitchArchive = (): {
  isLoading: boolean;
  switchArchive: (pageId: string, bool: boolean) => Promise<void>;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const { paginationPage, mutatePagePagination } = usePagePagination();

  const switchArchive = useCallback(
    async (pageId: string, bool: boolean): Promise<void> => {
      setIsLoading(true);

      mutatePagePagination(
        await restClient.apiPut<Page>(`/pages/${pageId}/archive`, { isArchive: bool }).then(() =>
          paginationPage
            ? {
                ...paginationPage,
                docs: paginationPage.docs.filter((page) => {
                  return page.id !== pageId;
                }),
              }
            : undefined,
        ),
        {
          optimisticData: paginationPage
            ? {
                ...paginationPage,
                docs: paginationPage.docs.filter((page) => {
                  return page.id !== pageId;
                }),
              }
            : undefined,
          rollbackOnError: true,
          revalidate: false,
        },
      );

      setIsLoading(false);
      return;
    },
    [mutatePagePagination, paginationPage],
  );

  return { isLoading, switchArchive };
};
