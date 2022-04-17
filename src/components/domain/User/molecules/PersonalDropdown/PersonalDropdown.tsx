import { useRouter } from 'next/router';
import { VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/react';
import style from 'styled-components';

import { UserIcon } from '~/components/domain/User/atoms/UserIcon';

import { useCurrentUser } from '~/stores/users';
import { useLocale } from '~/hooks/useLocale';

import { zIndex } from '~/libs/constants/zIndex';
import { HOME_URL } from '~/libs/constants/urls';

export const PersonalDropdown: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();

  if (!currentUser) {
    return (
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="nav-link p-0" tag="a" role="button">
        <UserIcon image={currentUser.image} />
      </DropdownToggle>
      <StyledDropdownMenu end className="dropdown-menu-dark">
        <DropdownItem header>
          <div className="text-center">
            <UserIcon image={currentUser.image} size={48} isCircle />
            <h5 className="my-2">{currentUser.name}</h5>
          </div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem divider />
        <DropdownItem tag="button" onClick={() => router.push(HOME_URL)}>
          {t.home}
        </DropdownItem>
        <DropdownItem tag="button" onClick={() => signOut({ callbackUrl: '/' })}>
          {t.logout}
        </DropdownItem>
      </StyledDropdownMenu>
    </UncontrolledDropdown>
  );
};

const StyledDropdownMenu = style(DropdownMenu)`
  z-index: ${zIndex.DROPDOWN_MENU};
`;
