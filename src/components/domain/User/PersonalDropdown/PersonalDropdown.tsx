import NextLink from 'next/link';
import { FC } from 'react';

import { useCurrentUser } from '~/stores/users';

import { Loading } from '~/components/uiParts/Loading/Loading';
import { Avatar } from '~/components/uiParts';
import { URLS } from '~/libs/constants/urls';

export const PersonalDropdown: FC = () => {
  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();

  if (isValidatingCurrentUser) {
    return <Loading color="secondary" />;
  }

  if (!currentUser) {
    return (
      <NextLink href={URLS.LOGIN} style={{ color: 'white' }}>
        Login
      </NextLink>
    );
  }

  return (
    <NextLink href={URLS.USER_SETTINGS_URL}>
      <Avatar text={currentUser.username} src={currentUser.profileUrl} bordered color="secondary" pointer as="div" />
    </NextLink>
  );
};
