import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { BootstrapIcon } from '~/interfaces/variables';
import { useLocale } from '~/hooks/useLocale';

import { Icon } from '~/components/base/atoms/Icon';

export const SubnavBar: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: BootstrapIcon }> = [
    { text: t.home, url: '/home', icon: 'HOME' },
    { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
    { text: t.scrap, url: '/scrap', icon: 'SCRAP' },
  ];

  return (
    <StyledSubnavBar className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <StyledSubnavBarItem className="text-center col py-2" isActive={router.pathname.startsWith(v.url)}>
              {v.icon != null && <Icon icon={v.icon} color="SECONDARY" />}
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
