import { FC } from 'react';

type customProps = {
  isActive?: boolean;
  children: ChildNode;
};

type Props = customProps;

export const SidebarListItem: FC<Props> = (props: Props) => {
  console.log(props);
  return <div {...props}>{props.children}</div>;
};
