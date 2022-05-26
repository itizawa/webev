import NextLink from 'next/link';
import { FC } from 'react';
import { Container, Grid } from '@nextui-org/react';

import { PersonalDropdown } from '~/components/domain/User/PersonalDropdown';

export const Navbar: FC = () => {
  return (
    <Container fluid responsive={false} css={{ height: '56px', bgColor: '$gray100' }} display="flex" alignItems="center">
      <Grid xs={3}>
        <NextLink href="/" style={{ fontWeight: 'bold', color: 'white' }}>
          Webev
        </NextLink>
      </Grid>
      <Grid xs={9} justify="flex-end">
        {/* <div className="d-flex justify-content-between align-items-center">
            <div className="col col-md-9 my-md-0 my-0 me-2">
              <PageUrlInputForm />
            </div>
          </div> */}
        <PersonalDropdown />
      </Grid>
    </Container>
  );
};
