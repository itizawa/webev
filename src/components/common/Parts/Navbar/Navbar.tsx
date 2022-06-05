import NextLink from 'next/link';
import { FC } from 'react';
import { Col, Container, Row } from '@nextui-org/react';

import { PersonalDropdown } from '~/components/domain/User/PersonalDropdown';
import { PageUrlInputForm } from '~/components/domain/Page/PageUrlInputForm';

export const Navbar: FC = () => {
  return (
    <Container fluid responsive={false} css={{ height: '56px', bgColor: '$gray100', px: '$8', '@sm': { px: '$12' } }} display="flex">
      <Row gap={0} css={{ alignItems: 'center', gap: '$8', '@sm': { gap: '$16' } }}>
        <NextLink href="/" style={{ fontWeight: 'bold', color: 'white' }}>
          Webev
        </NextLink>
        <Col>
          <PageUrlInputForm />
        </Col>
        <PersonalDropdown />
      </Row>
    </Container>
  );
};
