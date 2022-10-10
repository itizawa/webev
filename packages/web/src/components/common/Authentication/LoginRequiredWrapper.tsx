import { Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { Loading } from '@webev/web/components/uiParts';
import { URLS } from '@webev/web/libs/constants/urls';
import { useCurrentUser } from '@webev/web/stores/User';

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

  if (isLoadingCurrentUser)
    return (
      <Grid css={{ width: '100%', py: '$8', display: 'flex', justifyContent: 'center' }}>
        <Loading size="xl" color="secondary" />
      </Grid>
    );

  if (!currentUser) return null;

  return <>{children}</>;
};
