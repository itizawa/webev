import { FC } from 'react';
import { Container, Grid } from '@nextui-org/react';

import { Link } from '~/components/uiParts';

export const Navbar: FC = () => {
  return (
    <Container fluid responsive={false} css={{ height: '56px', bgColor: '$gray100' }} display="flex" alignItems="center">
      <Grid xs={3}>
        <Link href="/" style={{ fontWeight: 'bold', color: 'white' }}>
          Webev
        </Link>
      </Grid>
      <Grid xs={9} justify="flex-end">
        {/* <div className="d-flex justify-content-between align-items-center">
            <div className="col col-md-9 my-md-0 my-0 me-2">
              <PageUrlInputForm />
            </div>
            <PersonalDropdown />
          </div> */}
        <Link href="/login" block style={{ color: 'white' }}>
          Login
        </Link>
      </Grid>
    </Container>
  );
};
