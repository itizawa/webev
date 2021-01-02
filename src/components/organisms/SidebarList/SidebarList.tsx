import { FC, ReactNode } from 'react';
import ClassNames from 'classnames';
import './SidebarList.module.css';
import { HomeIcon } from '~src/components/icons/HomeIcon';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
};

const SidebarListItem: FC<Props> = (props: Props) => {
  const { isActive, isDisabled, children } = props;

  const classNameForListItem = ClassNames({
    'list-group-item list-group-item-action mx-3': true,
    active: isActive,
    disabled: isDisabled,
  });

  return <li className={classNameForListItem}>{children}</li>;
};

export const SidebarList: FC = () => {
  return (
    <ul className="sidebar-list-group list-group list-group-flush">
      <SidebarListItem isActive>
        <HomeIcon />
        <span className="ms-2">Home</span>
      </SidebarListItem>
      <SidebarListItem>test</SidebarListItem>
      <SidebarListItem isDisabled>disabled</SidebarListItem>
    </ul>
  );
};
