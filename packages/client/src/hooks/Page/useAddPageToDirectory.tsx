import { useCallback, useState } from 'react';
import { usePagePagination } from '.';
import { Page } from '@monorepo/webev-client/src/domains/Page';
import { restClient } from '@monorepo/webev-client/src/utils/rest-client';

export const useAddPageToDirectory = (): { isLoading: boolean; addPageToDirectory: (pageId: string, directoryId: string) => void } => {
  const { pagePagination, mutatePagePagination } = usePagePagination();
  const [isLoading, setIsLoading] = useState(false);

  const addPageToDirectory = useCallback(
    async (pageId: string, directoryId: string) => {
      setIsLoading(true);

      const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, { directoryId });

      if (!pagePagination) {
        return;
      }

      mutatePagePagination(
        {
          ...pagePagination,
          docs: [...pagePagination.docs.filter((v) => v._id !== pageId), data],
        },
        false,
      );

      setIsLoading(false);
    },
    [mutatePagePagination, pagePagination],
  );

  return { isLoading, addPageToDirectory };
};
