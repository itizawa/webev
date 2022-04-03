import { useState } from 'react';
import { Page } from '@monorepo/client/src/domains/Page';
import { restClient } from '@monorepo/client/src/utils/rest-client';

export const useRemovePageFromDirectory = (): { isLoading: boolean; removePageFromDirectory: (pageId: string) => Promise<Page> } => {
  const [isLoading, setIsLoading] = useState(false);

  const removePageFromDirectory = async (pageId: string) => {
    setIsLoading(true);
    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, {
      directoryId: null,
    });
    setIsLoading(false);
    return data;
  };

  return { isLoading, removePageFromDirectory };
};
