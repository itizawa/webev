import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from 'styled-components';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

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
              <StyledList className="list-group-item mx-3 border-0 c-pointer" isActive={v.url === router.pathname}>
                {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.LIGHT} />}
                <span className="ms-3 d-none d-lg-inline-block">{v.text}</span>
              </StyledList>
            </Link>
          );
        })}
      </ul>
      <hr className="mt-0" />
      <h5 className="text-center">
        <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
        <Link href="/directory">
          <span className="ms-2 d-none d-lg-inline-block c-pointer">Directory</span>
        </Link>
      </h5>
    </div>
  );
};

const StyledList = style.li<{ isActive: boolean }>`
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
