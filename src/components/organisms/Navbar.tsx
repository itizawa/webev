import { FC } from 'react';
import Link from 'next/link';

import { signIn, useSession, signOut } from 'next-auth/client';

import { InputForm } from '~/components/molecules/InputForm';

export const Navbar: FC = () => {
  const [session] = useSession();

  return (
    <div className="navbar bg-dark">
      <div className="container">
        <button
          className="navbar-toggler d-lg-none d-block"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/">
          <span className="navbar-brand mb-0 h1 text-white c-pointer">Webev</span>
        </Link>
        {session != null && (
          <div className="w-50 d-none d-md-block">
            <InputForm />
          </div>
        )}
        <div className="d-md-none d-block">{/* <PlusBoard /> */}</div>
        {session == null && (
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            ログイン
          </button>
        )}
        {session != null && (
          <button className="btn btn-primary" onClick={() => signOut()}>
            ログアウト
          </button>
        )}
      </div>
    </div>
  );
};
