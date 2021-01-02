import { FC, ReactNode } from 'react';
import ClassNames from 'classnames';
import '~src/styles/components/organism/SidebarList.module.scss';
import { HomeIcon } from '~src/components/icons/HomeIcon';
import { StarIcon } from '~src/components/icons/StarIcon';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
};

const SidebarListItem: FC<Props> = (props: Props) => {
  const { isActive, isDisabled, children } = props;

  const classNameForListItem = ClassNames({
    'sidebar-list-group-item list-group-item mx-3 border-0': true,
    active: isActive,
    disabled: isDisabled,
  });

  return <li className={classNameForListItem}>{children}</li>;
};

export const SidebarList: FC = () => {
  return (
    <ul className="sidebar-list-group list-group gap-3 py-3 text-white">
      <SidebarListItem isActive>
        <HomeIcon />
        <span className="ms-3">Home</span>
      </SidebarListItem>
      <SidebarListItem>
        <StarIcon />
        <span className="ms-3">Favorite</span>
      </SidebarListItem>
      <SidebarListItem isDisabled>
        <span className="ms-3">Disabled</span>
      </SidebarListItem>
    </ul>
  );
};
