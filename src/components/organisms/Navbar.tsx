import { FC } from 'react';
import Link from 'next/link';

import { signIn, useSession, signOut } from 'next-auth/client';

import { InputForm } from '~/components/molecules/InputForm';

export const Navbar: FC = () => {
  const [session] = useSession();

  return (
    <div className="navbar bg-dark">
      <div className="container">
        <Link href="/">
          <span className="navbar-brand mb-0 h1 text-white c-pointer">Webev</span>
        </Link>
        {session != null && (
          <div className="w-50 my-md-0 my-2">
            <InputForm />
          </div>
        )}
        {session == null && (
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        )}
        {session != null && (
          <button className="btn btn-primary d-none d-md-block" onClick={() => signOut()}>
            ログアウト
          </button>
        )}
      </div>
    </div>
  );
};
