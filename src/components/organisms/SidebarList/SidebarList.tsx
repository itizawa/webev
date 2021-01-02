import { FC, ReactNode } from 'react';
import ClassNames from 'classnames';
import '~src/styles/components/organism/SidebarList.module.scss';
import { HomeIcon } from '~src/components/icons/HomeIcon';
import { StarIcon } from '~src/components/icons/StarIcon';

type SidebarListItemProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  text: string;
  url: string;
  onClickSidebarListItem: (url: string) => void;
};

const SidebarListItem: FC<SidebarListItemProps> = (props: SidebarListItemProps) => {
  const { isActive, isDisabled, icon, text, onClickSidebarListItem, url } = props;

  const classNameForListItem = ClassNames({
    'sidebar-list-group-item list-group-item mx-3 border-0': true,
    active: isActive,
    disabled: isDisabled,
  });

  return (
    <li className={classNameForListItem} onClick={() => onClickSidebarListItem(url)}>
      {icon != null && icon}
      <span className="ms-3">{text}</span>
    </li>
  );
};

const sidebarItemMappings = [
  { text: 'Home', url: '/home', icon: <HomeIcon /> },
  { text: 'Favorite', url: '/favorites', icon: <StarIcon /> },
];

type SidebarListProps = {
  url: string;
  onClickSidebarListItem: (url: string) => void;
};

export const SidebarList: FC<SidebarListProps> = (props: SidebarListProps) => {
  const { url, onClickSidebarListItem } = props;

  return (
    <ul className="sidebar-list-group list-group gap-3 py-3 text-white">
      {sidebarItemMappings.map((v) => {
        return <SidebarListItem key={v.text} icon={v.icon} text={v.text} url={v.url} isActive={url === v.url} onClickSidebarListItem={onClickSidebarListItem} />;
      })}
    </ul>
  );
};
