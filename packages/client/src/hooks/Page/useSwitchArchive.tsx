import { useCallback, useState } from 'react';
import { Page } from '@monorepo/client/src/domains/Page';
import { restClient } from '@monorepo/client/src/utils/rest-client';
import { usePagePagination } from '.';

/**
 * Archiveを切り替える
 */
export const useSwitchArchive = (): {
  isLoading: boolean;
  switchArchive: (pageId: string, bool: boolean) => Promise<void>;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const { pagePagination, mutatePagePagination } = usePagePagination();

  const switchArchive = useCallback(
    async (pageId: string, bool: boolean): Promise<void> => {
      setIsLoading(true);

      mutatePagePagination(
        await restClient.apiPut<Page>(`/pages/${pageId}/archive`, { isArchive: bool }).then(() =>
          pagePagination
            ? {
                ...pagePagination,
                docs: pagePagination.docs.filter((page) => {
                  return page._id !== pageId;
                }),
              }
            : undefined,
        ),
        {
          optimisticData: pagePagination
            ? {
                ...pagePagination,
                docs: pagePagination.docs.filter((page) => {
                  return page._id !== pageId;
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
    [mutatePagePagination, pagePagination],
  );

  return { isLoading, switchArchive };
};
