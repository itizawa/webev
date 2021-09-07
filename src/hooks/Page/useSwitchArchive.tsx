import { useState } from 'react';
import { Page } from '~/domains/Page';
import { restClient } from '~/utils/rest-client';

export const useSwitchArchive = (): { isLoading: boolean; switchArchive: (pageId: string, bool: boolean) => Promise<Page> } => {
  const [isLoading, setIsLoading] = useState(false);

  const switchArchive = async (pageId: string, bool: boolean): Promise<Page> => {
    setIsLoading(true);
    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/archive`, { isArchive: bool });
    setIsLoading(false);
    return data;
  };

  return { isLoading, switchArchive };
};
