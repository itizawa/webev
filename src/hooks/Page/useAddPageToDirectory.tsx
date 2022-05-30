import { useState } from 'react';

export const useAddPageToDirectory = (): { isLoading: boolean } => {
  const [isLoading] = useState(false);

  // const addPageToDirectory = useCallback(
  //   async (pageId: string, directoryId: string) => {
  //     // setIsLoading(true);
  //     // const { data } = await restClient.apiPut<Page>(`/pages/${pageId}/directories`, { directoryId });
  //     // if (!pagePagination) {
  //     //   return;
  //     // }
  //     // mutatePagePagination(
  //     //   {
  //     //     ...pagePagination,
  //     //     docs: [...pagePagination.docs.filter((v) => v._id !== pageId), data],
  //     //   },
  //     //   false,
  //     // );
  //     // setIsLoading(false);
  //   },
  //   [mutatePagePagination, pagePagination],
  // );

  return { isLoading };
};
