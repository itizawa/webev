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
  const { mutatePagePagination } = usePagePagination();

  const switchArchive = useCallback(
    async (pageId: string, bool: boolean): Promise<void> => {
      setIsLoading(true);

      await restClient.apiPut<Page>(bool ? `/pages/${pageId}/archive` : `/pages/${pageId}/unarchive`);
      mutatePagePagination();

      setIsLoading(false);
      return;
    },
    [mutatePagePagination],
  );

  return { isLoading, switchArchive };
};
