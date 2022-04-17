import { useState } from 'react';
import { Page } from '~/domains/Page';
import { restClient } from '~/utils/rest-client';

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
