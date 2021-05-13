import { SWRResponse } from 'swr';
import { Directory } from '~/domains/Directory';
import { Page } from '~/domains/Page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const usePageForDelete = (initialData?: Page): SWRResponse<Page, Error> => {
  return useStaticSWR('pageForDeletePageModal', initialData);
};

export const useIsOpenDeletePageModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isOpenDeletePageModal', initialData);
};

export const usePageForAddDirectory = (initialData?: Page): SWRResponse<Page, Error> => {
  return useStaticSWR('pageForAddDirectory', initialData);
};

export const useIsOpenAddDirectoryModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isOpenAddDirectoryModal', initialData);
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
