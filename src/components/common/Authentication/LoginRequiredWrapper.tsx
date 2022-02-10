import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session == null) {
      router.push('/login?isRedirect=true');
    }
  }, [loading, router, session]);

  if (typeof window !== 'undefined' && loading)
    return (
      <div className="pt-5 d-flex align-items-center justify-content-center">
        <Oval color="#00BFFF" secondaryColor="rgba(0, 191, 255, 0.7)" height={100} width={100} />
      </div>
    );

  if (session != null) {
    return <>{children}</>;
  }

  return (
    <div className="pt-5 d-flex align-items-center justify-content-center">
      <Oval color="#00BFFF" secondaryColor="rgba(0, 191, 255, 0.7)" height={100} width={100} />
    </div>
  );
};
