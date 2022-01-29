import { VFC } from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import styled from 'styled-components';

import { PersonalDropdown } from '~/components/domain/User/molecules/PersonalDropdown';
import { PageUrlInputForm } from '~/components/domain/Page/molecules/PageUrlInputForm';

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export const Navbar: VFC = () => {
  const { status } = useSession();

  return (
    <StyledDiv className="navbar mx-auto row">
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
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  max-width: 1440px;
  min-height: 56px;
`;
