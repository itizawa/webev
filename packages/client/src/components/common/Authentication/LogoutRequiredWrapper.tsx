import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { HOME_URL } from '@monorepo/webev-client/src/libs/constants/urls';

export const LoginRequiredWrapper: FC = ({ children }) => {
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
