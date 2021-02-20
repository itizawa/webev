import { responseInterface } from 'swr';
import { Page } from '~/interfaces/page';
import { useStaticSWR } from '~/stores/use-static-swr';

export const usePageForDelete = (initialData?: Page): responseInterface<Page | null, Error> => {
  return useStaticSWR('pageForDeletePageModal', initialData);
};
