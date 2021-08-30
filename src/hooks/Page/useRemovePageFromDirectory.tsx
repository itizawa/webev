import { useState } from 'react';
import { Page } from '~/domains/Page';
import { usePageListSWR } from '~/stores/page';
import { restClient } from '~/utils/rest-client';

export const useRemovePageFromDirectory = (): { isLoading: boolean; removePageFromDirectory: (pageId: string) => void } => {
  const { data: pageList, mutate: mutatePageList } = usePageListSWR();
  const [isLoading, setIsLoading] = useState(false);

  const removePageFromDirectory = async (pageId: string) => {
    setIsLoading(true);

    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, {
      directoryId: null,
    });

    if (!pageList) {
      return;
    }

    mutatePageList(
      {
        ...pageList,
        docs: [...pageList.docs.filter((v) => v._id !== pageId), data],
      },
      false,
    );
    setIsLoading(false);
  };

  return { isLoading, removePageFromDirectory };
};
