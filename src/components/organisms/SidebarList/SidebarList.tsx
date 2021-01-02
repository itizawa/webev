import { FC, ReactNode } from 'react';
import ClassNames from 'classnames';
import '~src/styles/components/organism/SidebarList.module.scss';
import { HomeIcon } from '~src/components/icons/HomeIcon';
import { StarIcon } from '~src/components/icons/StarIcon';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  text: string;
};

const SidebarListItem: FC<Props> = (props: Props) => {
  const { isActive, isDisabled, icon, text } = props;

  const classNameForListItem = ClassNames({
    'sidebar-list-group-item list-group-item mx-3 border-0': true,
    active: isActive,
    disabled: isDisabled,
  });

  return (
    <li className={classNameForListItem}>
      {icon != null && icon}
      <span className="ms-3">{text}</span>
    </li>
  );
};

export const SidebarList: FC = () => {
  return (
    <ul className="sidebar-list-group list-group gap-3 py-3 text-white">
      <SidebarListItem icon={<HomeIcon />} text="Home" isActive />
      <SidebarListItem icon={<StarIcon />} text="favorite" />
      <SidebarListItem text="Disabled" isDisabled />
    </ul>
  );
};
