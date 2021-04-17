import { SWRResponse } from 'swr';
import urljoin from 'url-join';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Directory } from '~/interfaces/directory';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useDirectoryListSWR = (limit = 30): SWRResponse<PaginationResult<Directory>, Error> => {
  const page = 1;
  return useAuthenticationSWR(
    ['/directories/list', page, limit],
    (endpoint, page, limit) => restClient.apiGet(urljoin(endpoint, `?page=${page}`, `&limit=${limit}`)).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};

export const useDirectoryInfomation = (directoryId: string): SWRResponse<Directory, Error> => {
  return useAuthenticationSWR(
    ['/directories/', directoryId],
    (endpoint, directoryId) => restClient.apiGet(urljoin(endpoint, directoryId)).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
