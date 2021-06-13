import { VFC } from 'react';

type Props = {
  image: string;
  size?: number | 32;
  isCircle?: boolean;
};

export const UserIcon: VFC<Props> = (props) => {
  const { size, isCircle = false } = props;

  return <img height={size} width="auto" src={props.image} className={`${isCircle ? 'rounded-circle' : ''}`} />;
};
