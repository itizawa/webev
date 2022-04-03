import { SWRResponse } from 'swr';
import { OgpLayoutType } from '@monorepo/webev-client/src/libs/interfaces/contexts';
import { useStaticSWR } from '@monorepo/webev-client/src/stores/use-static-swr';

export const useOgpCardLayout = (initialData?: OgpLayoutType): SWRResponse<OgpLayoutType | null, Error> => {
  return useStaticSWR<OgpLayoutType | null, Error>('ogpCardLayout', initialData);
};
