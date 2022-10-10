import useSWR, { SWRResponse } from 'swr';

import { restClient } from '@webev/web/utils/rest-client';
import { PaginationResult } from '@webev/web/libs/interfaces/paginationResult';
import { Directory } from '@webev/web/domains/Directory';
import { DirectoryTree } from '@webev/web/domains/DirectoryTree';

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
  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<PaginationResult<Directory>>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};

export const useDirectoryChildren = (parentDirectoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = parentDirectoryId != null ? `/directories/${parentDirectoryId}/children` : null;
  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<DirectoryTree[]>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoriesChildren = (parentDirectoryIds: Array<string>): SWRResponse<DirectoryTree[], Error> => {
  const endpoint =
    parentDirectoryIds.length > 0 ? `/directories/children?${parentDirectoryIds.map((v) => `parentDirectoryIds[]=${v}`).join('&')}` : null;
  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<DirectoryTree[]>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAncestorDirectories = (directoryId?: string): SWRResponse<DirectoryTree[], Error> => {
  const endpoint = directoryId != null ? `/directories/${directoryId}/ancestor` : null;
  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<DirectoryTree[]>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useDirectoryInformation = (directoryId: string): SWRResponse<Directory, Error> => {
  const endpoint = directoryId != null ? `/directories/${directoryId}` : null;

  return useSWR(endpoint, (endpoint: string) => restClient.apiGet<Directory>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export const useAllDirectories = (): SWRResponse<Directory[], Error> => {
  return useSWR('/directories/all', (endpoint: string) => restClient.apiGet<Directory[]>(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
