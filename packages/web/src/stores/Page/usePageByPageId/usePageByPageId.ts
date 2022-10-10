import useSWR, { SWRResponse } from 'swr';

import { restClient } from '@webev/web/utils/rest-client';
import { Page } from '@webev/web/domains/Page';

export const usePageByPageId = ({ pageId }: { pageId: string }): SWRResponse<Page, Error> => {
  return useSWR(
    pageId ? `/pages/${pageId}` : null,
    (endpoint: string) => restClient.apiGet<{ page: Page }>(endpoint).then((result) => result.data.page),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
