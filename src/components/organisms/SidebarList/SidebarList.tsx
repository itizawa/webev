import { FC } from 'react';
import ClassNames from 'classnames';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
};

const SidebarListItem: FC<Props> = (props: Props) => {
  const { isActive, isDisabled } = props;

  const classNameForListItem = ClassNames({
    'list-group-item list-group-item-action': true,
    active: isActive,
    disabled: isDisabled,
  });
  return <li className={classNameForListItem}>Dapibus ac facilisis in</li>;
};

export const SidebarList: FC = () => {
  return (
    <ul className="list-group list-group-flush">
      <SidebarListItem isActive />
      <SidebarListItem />
      <SidebarListItem isDisabled />
      <SidebarListItem />
    </ul>
  );
};
