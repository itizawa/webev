import { SWRResponse } from 'swr';
import { Directory } from '~/domains/Directory';
import { Page } from '~/domains/Page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const usePageForDelete = (initialData?: Page): SWRResponse<Page | null, Error> => {
  return useStaticSWR<Page | null, Error>('pageForDeletePageModal', initialData);
};

export const usePageForAddDirectory = (initialData?: Page): SWRResponse<Page | null, Error> => {
  return useStaticSWR<Page | null, Error>('pageForAddDirectory', initialData);
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
