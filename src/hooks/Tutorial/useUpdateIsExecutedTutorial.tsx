import { useCallback, useState } from 'react';

import { usePagePagination } from '../Page';

import { restClient } from '~/utils/rest-client';
import { URLS } from '~/libs/constants/urls';

export const useUpdateIsExecutedTutorial = (): { isLoading: boolean; updateIsExecutedTutorial: () => Promise<void> } => {
  const { mutatePagePagination } = usePagePagination();

  const [isLoading, setIsLoading] = useState(false);

  const updateIsExecutedTutorial = useCallback(async () => {
    setIsLoading(true);

    await restClient.apiPost('/pages', { url: URLS.HOW_TO_USE });
    mutatePagePagination();

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 1000),
    );
  }, [mutatePagePagination]);

  return { isLoading, updateIsExecutedTutorial };
};
