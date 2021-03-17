import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { VFC, useEffect } from 'react';

export const LoginRequiredWrapper: VFC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // If session exists, redirect home page
    if (!loading && session != null) {
      router.push('/home');
    }
  }, [loading, session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  if (session == null) {
    return <>{children}</>;
  }

  return null;
};
