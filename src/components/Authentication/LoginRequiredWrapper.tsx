import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const LoginRequiredWrapper: FC = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If session exists, redirect login page
  if (session == null) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};
