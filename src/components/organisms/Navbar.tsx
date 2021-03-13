import { FC } from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/client';
import { ProfileCard } from '~/components/ProfileCard/ProfileCard';
import { InputForm } from '~/components/molecules/InputForm';
import { User } from '~/interfaces/user';

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
          <Link href="/login">
            <span className="mb-0 text-white c-pointer">Login</span>
          </Link>
        )}
        {session != null && <ProfileCard user={session.user as User} />}
      </div>
    </div>
  );
};
