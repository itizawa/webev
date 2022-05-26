import NextLink from 'next/link';
import { FC } from 'react';

import { useCurrentUser } from '~/stores/users';

import { Loading } from '~/components/uiParts/Loading/Loading';
import { Avatar } from '~/components/uiParts';

export const PersonalDropdown: FC = () => {
  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();

  if (isValidatingCurrentUser) {
    return <Loading color="secondary" />;
  }

  if (!currentUser) {
    return (
      <NextLink href="/login" style={{ color: 'white' }}>
        Login
      </NextLink>
    );
  }

  return <Avatar src={currentUser.profileUrl} bordered color="secondary" pointer />;
};
