import NextLink from 'next/link';
import { FC } from 'react';

import { useCurrentUser } from '@webev/web/stores/User';

import { Loading } from '@webev/web/components/uiParts/Loading/Loading';
import { Avatar } from '@webev/web/components/uiParts';
import { URLS } from '@webev/web/libs/constants/urls';

export const PersonalDropdown: FC = () => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();

  if (isLoadingCurrentUser) {
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
    <NextLink href={URLS.ME}>
      <Avatar text={currentUser.username} src={currentUser.profileUrl} bordered color="secondary" pointer as="div" />
    </NextLink>
  );
};
