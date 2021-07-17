import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/interfaces/paginationResult';
import { Directory } from '~/domains/Directory';
import { DirectoryTree } from '~/domains/DirectoryTree';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useDirectoryListSWR = (limit = 30): SWRResponse<PaginationResult<Directory>, Error> => {
  const page = 1;
  return useAuthenticationSWR(
    ['/directories/list', page, limit],
    (endpoint, page, limit) => restClient.apiGet(`${endpoint}?page=${page}&limit=${limit}`).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};

export const useAllParentDirectories = (): SWRResponse<Directory[], Error> => {
  return useAuthenticationSWR('/directories/parents', (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useDirectoryChildren = (parentDirectoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryId != null ? `/directories/${parentDirectoryId}/children` : null;
  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoryChildrens = (parentDirectoryIds?: Array<string>): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryIds != null ? `/directories/children?${parentDirectoryIds.map((v) => `parentDirectoryIds[]=${v}&`)}` : null;
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
  const endpoint = directoryId != null ? `/directories/${directoryId}` : null;

  return useAuthenticationSWR(endpoint, (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAllDirectories = (): SWRResponse<Directory[], Error> => {
  return useAuthenticationSWR(['/directories/all'], (endpoint) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
