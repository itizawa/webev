import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

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
    if (!isLoadingCurrentUser && !currentUser) {
      router.push(`${URLS.LOGIN}?isRedirect=true`);
    }
  }, [currentUser, isLoadingCurrentUser, router]);

  if (isLoadingCurrentUser) return <Loading size="xl" />;

  if (!currentUser) return null;

  return <>{children}</>;
};
