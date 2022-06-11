import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { Loading } from '~/components/uiParts';
import { URLS } from '~/libs/constants/urls';
import { useCurrentUser } from '~/stores/User';

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
    router.push(`${URLS.LOGIN}?isRedirect=true`);
  }, [currentUser, isLoadingCurrentUser, router]);

  if (isLoadingCurrentUser) return <Loading size="xl" color="secondary" />;

  if (!currentUser) return null;

  return <>{children}</>;
};
