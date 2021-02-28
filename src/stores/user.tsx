import { responseInterface } from 'swr';
import { User } from '~/interfaces/user';
import { useStaticSWR } from '~/stores/use-static-swr';

export const useCurrentUserSWR = (initialData?: User): responseInterface<User, Error> => {
  return useStaticSWR('currentUser', initialData);
};
