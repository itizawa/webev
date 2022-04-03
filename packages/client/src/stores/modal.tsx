import { SWRResponse } from 'swr';
import { Directory } from '@monorepo/webev-client/src/domains/Directory';
import { Page } from '@monorepo/webev-client/src/domains/Page';
import { useStaticSWR } from '@monorepo/webev-client/src/stores/use-static-swr';

export const usePageForAddToDirectory = (initialData?: Page): SWRResponse<Page | null, Error> => {
  return useStaticSWR<Page | null, Error>('pageForAddToDirectory', initialData);
};

export const useDirectoryForSavePage = (initialData?: Directory): SWRResponse<Directory | null, Error> => {
  return useStaticSWR<Directory | null, Error>('directoryForSavePage', initialData);
};

export const useDirectoryForDelete = (initialData?: Directory): SWRResponse<Directory | null, Error> => {
  return useStaticSWR<Directory | null, Error>('directoryForDelete', initialData);
};

export const useDirectoryForRename = (initialData?: Directory): SWRResponse<Directory | null, Error> => {
  return useStaticSWR<Directory | null, Error>('directoryForRename', initialData);
};

export const useParentDirectoryForCreateDirectory = (initialData?: Directory): SWRResponse<Directory | null, Error> => {
  return useStaticSWR<Directory | null, Error>('parentDirectoryForCreateDirectory', initialData);
};
