import { SWRResponse } from 'swr';
import urljoin from 'url-join';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Directory } from '~/domains/Directory';
import { DirectoryTree } from '~/domains/DirectoryTree';
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

export const useDirectoryChildren = (parentDirectoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryId != null ? `/directories/${parentDirectoryId}/children` : null;
  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAncestorDirectories = (directoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = directoryId != null ? `/directories/${directoryId}/ancestor` : null;
  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoryInfomation = (directoryId: string): SWRResponse<Directory, Error> => {
  return useAuthenticationSWR(
    ['/directories/', directoryId],
    (endpoint, directoryId) => restClient.apiGet(urljoin(endpoint, directoryId)).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
