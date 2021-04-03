import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from 'styled-components';

import { BootstrapColor } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const SubnavBar: VFC = () => {
  const router = useRouter();

  return (
    <StyledSubnavBar className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <StyledSubnavBarItem className="text-center col py-2" isActive={v.url === router.pathname}>
              {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.SECONDARY} />}
              <span className="ms-1">{v.text}</span>
            </StyledSubnavBarItem>
          </Link>
        );
      })}
    </StyledSubnavBar>
  );
};

const StyledSubnavBar = style.div`
  top: -1px;
`;

const StyledSubnavBarItem = style.div<{ isActive: boolean }>`
  ${({ isActive }) => isActive && `border-bottom: 4px solid slateblue;`}
`;
