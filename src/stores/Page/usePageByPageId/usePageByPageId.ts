import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Page } from '~/domains/Page';

export const usePageByPageId = ({ pageId }: { pageId: string }): SWRResponse<Page, Error> => {
  return useSWR(`/pages/${pageId}`, (endpoint: string) => restClient.apiGet<Page>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
