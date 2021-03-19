import { useEffect, useState, VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';

import { UserIcon } from '~/components/Icons/UserIcon';
import { User } from '~/interfaces/user';

type Props = {
  user: User;
};

export const PersonalDropdown: VFC<Props> = (props: Props) => {
  const { user } = props;
  const [isEnableReadFromClipboard, setIsEnableReadFromClipboard] = useState(false);

  useEffect(() => {
    const isEnableReadFromClipboard = localStorage.getItem('isEnableReadFromClipboard') === 'true';
    setIsEnableReadFromClipboard(isEnableReadFromClipboard);
  }, []);

  const handleSwitch = () => {
    const bool = !isEnableReadFromClipboard;
    setIsEnableReadFromClipboard(bool);
    localStorage.setItem('isEnableReadFromClipboard', bool.toString());
  };

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
        <div className="px-3">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="isEnableReadFromClipboard" checked={isEnableReadFromClipboard} onChange={handleSwitch} />
            <label className="form-check-label" htmlFor="isEnableReadFromClipboard">
              自動取得
            </label>
          </div>
        </div>
        <DropdownItem divider />
        <DropdownItem tag="li" onClick={() => signOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
