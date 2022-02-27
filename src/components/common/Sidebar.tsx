import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

import { BootstrapIcon } from '~/libs/interfaces/variables';
import { Icon } from '~/components/base/atoms/Icon';

export const Sidebar: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: BootstrapIcon }> = [
    { text: t.home, url: '/home', icon: 'HOME' },
    { text: t.read, url: '/archived', icon: 'CHECK' },
    { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
  ];

  return (
    <div className="sticky-top">
      <ul className="list-group gap-3 py-3">
        {navbarItemMappings.map((v) => {
          return (
            <Link key={v.text} href={v.url}>
              <StyledList className="list-group-item mx-3 border-0" isActive={router.pathname.startsWith(v.url)} role="button">
                {v.icon != null && <Icon icon={v.icon} color="LIGHT" />}
                <span className="ms-3">{v.text}</span>
              </StyledList>
            </Link>
          );
        })}
      </ul>
      <hr className="mt-0" />
      {/* <SidebarDirectoryList /> */}
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
    background-color: #6f42c1;
    box-shadow: 0 12px 20px -10px rgba(111, 66, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(111, 66, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;
