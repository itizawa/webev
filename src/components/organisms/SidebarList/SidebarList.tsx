import { FC, ReactNode } from 'react';
import ClassNames from 'classnames';
// import '~src/styles/components/organism/SidebarList.module.scss';
import { HomeIcon } from '~src/components/icons/HomeIcon';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
};

const SidebarListItem: FC<Props> = (props: Props) => {
  const { isActive, isDisabled, children } = props;

  const classNameForListItem = ClassNames({
    'sidebar-list-group-item list-group-item mx-3': true,
    active: isActive,
    disabled: isDisabled,
  });

  return <li className={classNameForListItem}>{children}</li>;
};

export const SidebarList: FC = () => {
  return (
    <ul className="sidebar-list-group list-group gap-3">
      <SidebarListItem isActive>
        <HomeIcon />
        <span className="ms-2">Home</span>
      </SidebarListItem>
      <SidebarListItem>test</SidebarListItem>
      <SidebarListItem isDisabled>disabled</SidebarListItem>
    </ul>
  );
};
