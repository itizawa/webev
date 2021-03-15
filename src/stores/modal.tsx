import { SWRResponse } from 'swr';
import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const usePageForDelete = (initialData?: Page): SWRResponse<Page, Error> => {
  return useStaticSWR('pageForDeletePageModal', initialData);
};

export const useIsOpenDeletePageModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR('isOpenDeletePageModal', initialData);
};
