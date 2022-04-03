import { SWRResponse } from 'swr';

import { restClient } from '@monorepo/client/src/utils/rest-client';
import { PaginationResult } from '@monorepo/client/src/libs/interfaces/paginationResult';
import { Directory } from '@monorepo/client/src/domains/Directory';
import { DirectoryTree } from '@monorepo/client/src/domains/DirectoryTree';
import { useAuthenticationSWR } from '@monorepo/client/src/stores/use-authentication-swr';

export const useDirectoryPaginationResult = ({
  searchKeyWord,
  activePage = 1,
  isRoot,
}: {
  searchKeyWord: string;
  activePage?: number;
  isRoot?: boolean;
}): SWRResponse<PaginationResult<Directory>, Error> => {
  const endpoint = `/directories/list?page=${activePage}${isRoot ? `&isRoot=${isRoot}` : ''}${searchKeyWord ? `&q=${searchKeyWord}` : ``}`;
  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useDirectoryChildren = (parentDirectoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryId != null ? `/directories/${parentDirectoryId}/children` : null;
  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoriesChildren = (parentDirectoryIds: Array<string>): SWRResponse<DirectoryTree[], Error> => {
  const endpoint =
    parentDirectoryIds.length > 0 ? `/directories/children?${parentDirectoryIds.map((v) => `parentDirectoryIds[]=${v}`).join('&')}` : null;
  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAncestorDirectories = (directoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = directoryId != null ? `/directories/${directoryId}/ancestor` : null;
  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoryInformation = (directoryId: string): SWRResponse<Directory, Error> => {
  const endpoint = directoryId != null ? `/directories/${directoryId}` : null;

  return useAuthenticationSWR(endpoint, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAllDirectories = (): SWRResponse<Directory[], Error> => {
  return useAuthenticationSWR('/directories/all', (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
