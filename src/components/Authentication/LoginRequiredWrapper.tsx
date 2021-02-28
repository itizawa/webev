/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'next/router';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

export const LoginRequiredWrapper: any = (props: any) => {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log(session, loading);
  }, [Router]);
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <DashBoardLayout>
        <div className="p-3">
          <h1>Login Required</h1>
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        </div>
      </DashBoardLayout>
    );
  }

  return <>{props.children}</>;
};
