import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from 'react-loader-spinner';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?isRedirect=true');
    }
  }, [router, status]);

  if (status === 'loading')
    return (
      <div className="text-center pt-5">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </div>
    );

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return (
    <div className="text-center pt-5">
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
};
