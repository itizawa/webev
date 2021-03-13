import { VFC } from 'react';

type Props = {
  image?: string;
};

export const UserIcon: VFC<Props> = (props: Props) => {
  return <img src={props.image || 'no'} />;
};
