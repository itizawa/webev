import { useState } from 'react';
import { Page } from '~/domains/Page';
import { usePageListSWR } from '~/stores/page';
import { restClient } from '~/utils/rest-client';

export const useAddPageToDirectory = (): { isLoading: boolean; addPageToDirectory: (pageId: string, directoryId: string) => void } => {
  const { data: pageList, mutate: mutatePageList } = usePageListSWR();
  const [isLoading, setIsLoading] = useState(false);

  const addPageToDirectory = async (pageId: string, directoryId: string) => {
    setIsLoading(true);

    const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, { directoryId });

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

  return { isLoading, addPageToDirectory };
};
