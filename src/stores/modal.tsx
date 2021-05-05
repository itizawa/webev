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

export const useDirectoryForDelete = (initialData?: Directory): SWRResponse<Directory, Error> => {
  return useStaticSWR('directoryForDelete', initialData);
};

export const useIsOpenDeleteDirectoryModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isOpenDeleteDirectoryModal', initialData);
};

export const useParentDirectoryForCreateDirectory = (initialData?: Page): SWRResponse<Page, Error> => {
  return useStaticSWR('parentDirectoryForCreateDirectory', initialData);
};

export const useIsOpenCreateDirectoryModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isOpenCreateDirectoryModal', initialData);
};
