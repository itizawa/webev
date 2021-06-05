import { VFC } from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/client';
import { PersonalDropdown } from '~/components/PersonalDropdown/PersonalDropdown';
import { InputForm } from '~/components/molecules/InputForm';
import { User } from '~/interfaces/user';

export const Navbar: VFC = () => {
  const [session, loading] = useSession();

  return (
    <div className="navbar container">
      <Link href="/">
        <span className="navbar-brand mb-0 text-white fw-bold" role="button">
          Webev
        </span>
      </Link>
      {session != null && (
        <div className="col col-md-6 my-md-0 my-2 me-2">
          <InputForm />
        </div>
      )}
      {session == null && !loading && (
        <Link href="/login">
          <span className="mb-0 text-white" role="button">
            Login
          </span>
        </Link>
      )}
      {session != null && <PersonalDropdown user={session.user as User} />}
    </div>
  );
};
