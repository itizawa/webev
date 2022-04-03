import { useCallback, useState } from 'react';

import { User } from '@monorepo/client/src/domains/User';

import { useCurrentUser } from '@monorepo/client/src/stores/user';

import { restClient } from '@monorepo/client/src/utils/rest-client';
import { URLS } from '@monorepo/client/src/libs/constants/urls';
import { usePagePagination } from '../Page';

export const useUpdateIsExecutedTutorial = (): { isLoading: boolean; updateIsExecutedTutorial: () => Promise<void> } => {
  const { mutatePagePagination } = usePagePagination();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const updateIsExecutedTutorial = useCallback(async () => {
    setIsLoading(true);

    const [{ data }] = await Promise.all([
      restClient.apiPut<User>('/users/me/isExecutedTutorial'),

      await restClient.apiPost('/pages', { url: URLS.HOW_TO_USE }),
    ]);
    mutatePagePagination();

    setTimeout(() => {
      mutateCurrentUser(data, false);
      setIsLoading(false);
    }, 2000);
  }, [mutateCurrentUser, mutatePagePagination]);

  return { isLoading, updateIsExecutedTutorial };
};
