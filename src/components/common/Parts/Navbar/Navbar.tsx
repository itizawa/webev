import { FC } from 'react';
import Link from 'next/link';

import { Container } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { PersonalDropdown } from '~/components/domain/User/molecules/PersonalDropdown';
import { PageUrlInputForm } from '~/components/domain/Page/molecules/PageUrlInputForm';

export const Navbar: FC = () => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const { status } = useSession();

  return (
    <Container fluid css={{ height: '56px' }} display="flex" alignItems="center">
      <div className="col-3">
        <Link href="/">
          <span className="navbar-brand mb-0 text-white fw-bold" role="button">
            Webev
          </span>
        </Link>
      </div>
      <div className="col-9">
        {status === 'authenticated' && !isMaintenanceMode && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="col col-md-9 my-md-0 my-0 me-2">
              <PageUrlInputForm />
            </div>
            <PersonalDropdown />
          </div>
        )}
        {status === 'unauthenticated' && (
          <div className="d-flex align-items-center justify-content-end">
            <Link href="/login">
              <span className="mb-0 text-white" role="button">
                Login
              </span>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};
