import { useState } from 'react';

export const useRemovePageFromDirectory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const removePageFromDirectory = async () => {
    setIsLoading(true);
    // const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, {
    //   directoryId: null,
    // });
    setIsLoading(false);
    // return data;
  };

  return { isLoading, removePageFromDirectory };
};
