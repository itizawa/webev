import { VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';

import { UserIcon } from '~/components/Icons/UserIcon';
import { User } from '~/interfaces/user';

type Props = {
  user: User;
};

export const PersonalDropdown: VFC<Props> = (props: Props) => {
  const { user } = props;

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="nav-link p-0 c-pointer" tag="a">
        <UserIcon image={user.image} size="medium" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-dark personal-dropdown-menu">
        <DropdownItem header>
          <div className="text-center">
            <UserIcon image={user.image} size="large" isCircle />
            <h5 className="my-2">{user.name}</h5>
          </div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag="li" onClick={() => signOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
