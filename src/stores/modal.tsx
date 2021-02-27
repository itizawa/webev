import { responseInterface } from 'swr';
import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const usePageForDelete = (initialData?: Page): responseInterface<Page, Error> => {
  return useStaticSWR('pageForDeletePageModal', initialData);
};

export const useIsOpenDeletePageModal = (initialData?: boolean): responseInterface<boolean, Error> => {
  return useStaticSWR('isOpenDeletePageModal', initialData);
};
