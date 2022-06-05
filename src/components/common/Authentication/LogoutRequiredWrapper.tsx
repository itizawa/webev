import { useRouter } from 'next/router';
import { FC, useEffect, ReactNode } from 'react';
import { Loading } from '~/components/uiParts';

import { URLS } from '~/libs/constants/urls';
import { useCurrentUser } from '~/stores/users';

type Props = {
  children: ReactNode;
};

export const LoginRequiredWrapper: FC<Props> = ({ children }) => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingCurrentUser || currentUser) {
      return;
    }
    router.push(URLS.HOME_URL);
  }, [currentUser, isLoadingCurrentUser, router]);

  if (isLoadingCurrentUser) return <Loading color="secondary" />;

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
};
