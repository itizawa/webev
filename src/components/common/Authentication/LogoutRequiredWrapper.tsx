import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { HOME_URL } from '~/libs/constants/urls';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session != null) {
      router.push(HOME_URL);
    }
  }, [loading, router, session]);

  if (typeof window !== 'undefined' && loading)
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </div>
    );

  if (session == null) {
    return <>{children}</>;
  }

  return (
    <div className="text-center pt-5">
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
};
