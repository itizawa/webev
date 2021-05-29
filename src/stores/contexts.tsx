import { SWRResponse } from 'swr';
import { OgpLayoutType } from '~/interfaces/contexts';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useSocketId = (initialData?: string): SWRResponse<string, Error> => {
  return useStaticSWR('socketId', initialData);
};

export const useUrlFromClipBoard = (initialData?: string): SWRResponse<string | null, Error> => {
  return useStaticSWR<string | null, Error>('urlFromClipBoard', initialData);
};

export const useOgpCardLayout = (initialData?: OgpLayoutType): SWRResponse<OgpLayoutType | null, Error> => {
  return useStaticSWR<OgpLayoutType | null, Error>('ogpCardLayout', initialData);
};
