import { responseInterface } from 'swr';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useIsOpenDeletePageModal = (initialData?: boolean): responseInterface<boolean, any> => {
  return useStaticSWR('isOpenDeletePageModal', initialData);
};
