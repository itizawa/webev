import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { SidebarDirectory } from '~/components/Sidebar/SidebarDirectory';
import { BootstrapColor } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const Sidebar: VFC = () => {
  const router = useRouter();

  return (
    <div className="sticky-top">
      <ul className="sidebar-list-group list-group gap-3 py-3">
        {navbarItemMappings.map((v) => {
          return (
            <Link key={v.text} href={v.url}>
              <StyledList className="list-group-item mx-3 border-0" isActive={v.url === router.pathname} role="button">
                {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.LIGHT} />}
                <span className="ms-3">{v.text}</span>
              </StyledList>
            </Link>
          );
        })}
      </ul>
      <hr className="mt-0" />
      <SidebarDirectory />
    </div>
  );
};

const StyledList = styled.li<{ isActive: boolean }>`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  ${({ isActive }) =>
    isActive
      ? `
    margin-top: 0px;
    background-color: #00acc1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;
