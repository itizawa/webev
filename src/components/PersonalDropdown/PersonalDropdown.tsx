import { useEffect, useState, VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';
import style from 'styled-components';

import { toastSuccess } from '~/utils/toastr';

import { UserIcon } from '~/components/Icons/UserIcon';
import { User } from '~/interfaces/user';

import { useLocale } from '~/hooks/useLocale';

type Props = {
  user: User;
};

export const PersonalDropdown: VFC<Props> = (props: Props) => {
  const { t } = useLocale();
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
    toastSuccess(t.toastr_update_setting);
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="nav-link p-0" tag="a" role="button">
        <UserIcon image={user.image} size="medium" />
      </DropdownToggle>
      <StyledDropdownMenu right className="dropdown-menu-dark">
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
              {t.automatic_acquisition}
            </label>
          </div>
          <div className="text-center">
            <a className="text-info small webev-anchor" href="https://itizawa-tech.growi.cloud/6055a19f2c62a800488491b4" target="blank" rel="noopener noreferrer">
              {t.function_details}
            </a>
          </div>
        </div>
        <DropdownItem divider />
        <DropdownItem tag="button" onClick={() => signOut({ callbackUrl: '/' })}>
          {t.logout}
        </DropdownItem>
      </StyledDropdownMenu>
    </UncontrolledDropdown>
  );
};

const StyledDropdownMenu = style(DropdownMenu)`
  z-index: 1300;
`;
