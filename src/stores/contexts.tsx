import { SWRResponse } from 'swr';
import { OgpLayoutType } from '~/libs/interfaces/contexts';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useOgpCardLayout = (initialData?: OgpLayoutType): SWRResponse<OgpLayoutType | null, Error> => {
  return useStaticSWR<OgpLayoutType | null, Error>('ogpCardLayout', initialData);
};
