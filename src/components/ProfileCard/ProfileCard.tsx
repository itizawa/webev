import { VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';

import { UserIcon } from '~/components/Icons/UserIcon';
import { User } from '~/interfaces/user';

type Props = {
  user: User;
};

export const ProfileCard: VFC<Props> = (props: Props) => {
  const { user } = props;

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="nav-link p-0">
        <UserIcon image={user.image} size="medium" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-dark">
        <DropdownItem tag="li" onClick={() => signOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
