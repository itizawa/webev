import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { VFC, useEffect, ReactNode } from 'react';

import { HOME_URL } from '~/libs/constants/urls';

type Props = {
  children: ReactNode;
};

export const LoginRequiredWrapper: VFC<Props> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(HOME_URL);
    }
  }, [router, status]);

  if (typeof window !== 'undefined' && status === 'loading')
    return (
      <div className="pt-5 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (status === 'unauthenticated') {
    return <>{children}</>;
  }

  return (
    <div className="pt-5 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
