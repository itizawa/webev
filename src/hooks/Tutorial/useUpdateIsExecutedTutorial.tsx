import { useCallback, useState } from 'react';

import { User } from '~/domains/User';

import { usePageListSWR } from '~/stores/page';
import { useCurrentUser } from '~/stores/user';

import { restClient } from '~/utils/rest-client';
import { HOW_TO_USE_URL } from '~/libs/constants/urls';

export const useUpdateIsExecutedTutorial = (): { isLoading: boolean; updateIsExecutedTutorial: () => Promise<void> } => {
  const { mutate: mutatePageList } = usePageListSWR();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const updateIsExecutedTutorial = useCallback(async () => {
    setIsLoading(true);

    const { data } = await restClient.apiPut<User>('/users/me/isExecutedTutorial');

    await restClient.apiPost('/pages', { url: HOW_TO_USE_URL });
    mutatePageList();

    setTimeout(() => {
      mutateCurrentUser(data, false);
      setIsLoading(false);
    }, 2000);
  }, [mutateCurrentUser, mutatePageList]);

  return { isLoading, updateIsExecutedTutorial };
};
