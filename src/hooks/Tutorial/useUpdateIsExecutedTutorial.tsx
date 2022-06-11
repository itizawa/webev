import { useCallback, useState } from 'react';

import { usePagePagination } from '../Page';
import { User } from '~/domains/User';

import { restClient } from '~/utils/rest-client';
import { URLS } from '~/libs/constants/urls';
import { useCurrentUser } from '~/stores/users';

export const useUpdateIsExecutedTutorial = (): { isLoading: boolean; updateIsExecutedTutorial: () => Promise<void> } => {
  const { mutatePagePagination } = usePagePagination();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const updateIsExecutedTutorial = useCallback(async () => {
    setIsLoading(true);

    const [{ data }] = await Promise.all([
      restClient.apiPut<User>('/users/me/isCompletedTutorial'),
      restClient.apiPost('/pages', { url: URLS.HOW_TO_USE }),
    ]);
    mutatePagePagination();

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        mutateCurrentUser(data, false);
        setIsLoading(false);
        resolve();
      }, 1000),
    );
  }, [mutateCurrentUser, mutatePagePagination]);

  return { isLoading, updateIsExecutedTutorial };
};
