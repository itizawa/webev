import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { PaginationResult } from '~/libs/interfaces/paginationResult';
import { Directory } from '~/domains/Directory';
import { DirectoryTree } from '~/domains/DirectoryTree';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';

export const useDirectoryListSWR = ({
  searchKeyWord,
  activePage = 1,
  isRoot,
}: {
  searchKeyWord: string;
  activePage?: number;
  isRoot?: boolean;
}): SWRResponse<PaginationResult<Directory>, Error> => {
  return useAuthenticationSWR(
    ['/directories/list', activePage, isRoot, searchKeyWord],
    (endpoint, activePage, isRoot, searchKeyWord) =>
      restClient
        .apiGet(`${endpoint}?page=${activePage}${isRoot ? `&isRoot=${isRoot}` : ''}${searchKeyWord ? `&q=${searchKeyWord}` : ``}`)
        .then((result) => result.data),
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

export const useDirectoriesChildren = (parentDirectoryIds: Array<string>): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryIds.length > 0 ? `/directories/children?${parentDirectoryIds.map((v) => `parentDirectoryIds[]=${v}`).join('&')}` : null;
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

export const useDirectoryInformation = (directoryId: string): SWRResponse<Directory, Error> => {
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
