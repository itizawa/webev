import { useEffect, useState, VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';
import { toastSuccess } from '~/utils/toastr';

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
    toastSuccess('設定を更新しました');
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
          <div className="text-center">
            <a
              className="text-info text-decoration-none small"
              href="https://itizawa-tech.growi.cloud/6055a19f2c62a800488491b4"
              target="blank"
              rel="noopener noreferrer"
            >
              機能の詳細
            </a>
          </div>
        </div>
        <DropdownItem divider />
        <DropdownItem tag="button" onClick={() => signOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
