import { useState } from 'react';
import { Page } from '~/domains/Page';
import { usePageListSWR } from '~/stores/page';
import { restClient } from '~/utils/rest-client';

export const useSwitchArchive = (): { isLoading: boolean; switchArchive: (pageId: string, bool: boolean) => void } => {
  const { data: pageList, mutate: mutatePageList } = usePageListSWR();
  const [isLoading, setIsLoading] = useState(false);

  const switchArchive = async (pageId: string, bool: boolean) => {
    setIsLoading(true);

    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/archive`, { isArchive: bool });

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

  return { isLoading, switchArchive };
};
