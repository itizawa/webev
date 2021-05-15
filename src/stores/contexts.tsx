import { SWRResponse } from 'swr';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useSocketId = (initialData?: string): SWRResponse<string, Error> => {
  return useStaticSWR('socketId', initialData);
};
