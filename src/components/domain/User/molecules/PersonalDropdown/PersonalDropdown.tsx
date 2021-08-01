import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { signOut } from 'next-auth/client';
import style from 'styled-components';
import Loader from 'react-loader-spinner';

import { toastSuccess } from '~/utils/toastr';

import { Icon } from '~/components/base/atoms/Icon';
import { UserIcon } from '~/components/domain/User/atoms/UserIcon';

import { useLocale } from '~/hooks/useLocale';

import { useCurrentUser } from '~/stores/user';
import { useOgpCardLayout } from '~/stores/contexts';
import { OgpLayoutType } from '~/interfaces/contexts';

export const PersonalDropdown: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: ogpCardLayout = OgpLayoutType.CARD, mutate: mutateOgpCardLayout } = useOgpCardLayout();
  const { data: currentUser } = useCurrentUser();

  const [isEnableReadFromClipboard, setIsEnableReadFromClipboard] = useState(false);

  useEffect(() => {
    const isEnableReadFromClipboard = localStorage.getItem('isEnableReadFromClipboard') === 'true';
    setIsEnableReadFromClipboard(isEnableReadFromClipboard);
    const ogpCardLayout = localStorage.getItem('ogpCardLayout') as OgpLayoutType;
    mutateOgpCardLayout(ogpCardLayout);
  }, []);

  const handleSwitch = () => {
    const bool = !isEnableReadFromClipboard;
    setIsEnableReadFromClipboard(bool);
    localStorage.setItem('isEnableReadFromClipboard', bool.toString());
    toastSuccess(t.toastr_update_setting);
  };

  const handleClickOgpCardLayout = (type: OgpLayoutType) => {
    localStorage.setItem('ogpCardLayout', type);
    mutateOgpCardLayout(type);
  };

  if (currentUser == null) {
    return <Loader type="Oval" color="#00BFFF" height={32} width={32} />;
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="nav-link p-0" tag="a" role="button">
        <UserIcon image={currentUser.image} />
      </DropdownToggle>
      <StyledDropdownMenu right className="dropdown-menu-dark">
        <DropdownItem header>
          <div className="text-center">
            <Link href={`/user/${currentUser._id}`}>
              <a className="text-white webev-anchor">
                <UserIcon image={currentUser.image} size={48} isCircle />
                <h5 className="my-2">{currentUser.name}</h5>
              </a>
            </Link>
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
        <div className="px-3 my-3 d-flex justify-content-between">
          <button
            className={`btn btn-outline-primary ${ogpCardLayout === OgpLayoutType.LIST ? 'active' : ''}`}
            onClick={() => handleClickOgpCardLayout(OgpLayoutType.LIST)}
          >
            <Icon height={20} width={20} icon="LIST" color="WHITE" />
          </button>
          <button
            className={`btn btn-outline-primary ${ogpCardLayout === OgpLayoutType.CARD ? 'active' : ''}`}
            onClick={() => handleClickOgpCardLayout(OgpLayoutType.CARD)}
          >
            <Icon height={20} width={20} icon="GRID" color="WHITE" />
          </button>
        </div>
        <DropdownItem divider />
        <DropdownItem tag="button" onClick={() => router.push('/user/settings')}>
          {t.settings}
        </DropdownItem>
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
