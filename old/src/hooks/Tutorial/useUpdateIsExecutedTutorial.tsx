import { useState } from 'react';

import { User } from '~/domains/User';

import { usePageListSWR } from '~/stores/page';
import { useCurrentUser } from '~/stores/user';
import { useSocketId } from '~/stores/contexts';

import { restClient } from '~/utils/rest-client';
import { HOW_TO_USE_URL } from '~/libs/constants/urls';

export const useUpdateIsExecutedTutorial = (): { isLoading: boolean; updateIsExecutedTutorial: () => Promise<void> } => {
  const { mutate: mutatePageList } = usePageListSWR();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const { data: socketId } = useSocketId();

  const [isLoading, setIsLoading] = useState(false);

  const updateIsExecutedTutorial = async () => {
    setIsLoading(true);

    const { data } = await restClient.apiPut<User>('/users/me/isExecutedTutorial');
    await restClient.apiPost('/pages', { url: HOW_TO_USE_URL, socketId });
    mutatePageList();

    setTimeout(() => mutateCurrentUser(data, false), 2000);
    setIsLoading(false);
  };

  return { isLoading, updateIsExecutedTutorial };
};
