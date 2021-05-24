import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { useLocale } from '~/hooks/useLocale';

import { Icon } from '~/components/Icons/Icon';

export const SubnavBar: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings = [
    { text: t.home, url: '/home', icon: BootstrapIcon.HOME },
    { text: t.read, url: '/read', icon: BootstrapIcon.CHECK },
    { text: t.directory, url: '/directory', icon: BootstrapIcon.DIRECTORY },
  ];

  return (
    <StyledSubnavBar className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <StyledSubnavBarItem className="text-center col py-2" isActive={v.url === router.pathname}>
              {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.SECONDARY} />}
              <small className="ms-1">{v.text}</small>
            </StyledSubnavBarItem>
          </Link>
        );
      })}
    </StyledSubnavBar>
  );
};

const StyledSubnavBar = styled.div`
  top: -1px;
`;

const StyledSubnavBarItem = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => isActive && `border-bottom: 4px solid slateblue;`}
`;
