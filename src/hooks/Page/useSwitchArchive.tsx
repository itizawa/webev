import { useCallback, useState } from 'react';
import { Page } from '~/domains/Page';
import { restClient } from '~/utils/rest-client';

/**
 * Archiveを切り替える
 */
export const useSwitchArchive = (): {
  isLoading: boolean;
  switchArchive: (pageId: string, bool: boolean) => Promise<Page>;
} => {
  const [isLoading, setIsLoading] = useState(false);

  const switchArchive = useCallback(async (pageId: string, bool: boolean): Promise<Page> => {
    setIsLoading(true);
    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/archive`, { isArchive: bool }).finally(() => {
      setIsLoading(false);
    });
    return data;
  }, []);

  return { isLoading, switchArchive };
};
