import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { HOME_URL } from '~/libs/constants/urls';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(HOME_URL);
    }
  }, [router, session, status]);

  if (status === 'loading')
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
