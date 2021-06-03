import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from 'react-loader-spinner';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // If session exists, redirect login page
    if (!loading && session == null) {
      router.push('/login?isRedirect=true');
    }
  }, [loading, session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  if (session != null) {
    return <>{children}</>;
  }

  return (
    <div className="text-center pt-5">
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
};
