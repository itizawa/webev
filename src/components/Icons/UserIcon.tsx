import { VFC } from 'react';

type Props = {
  image: string;
  size?: number;
  isCircle?: boolean;
};

const defaultSize = 32;

export const UserIcon: VFC<Props> = (props) => {
  const { size, isCircle = false } = props;

  return <img height={size || defaultSize} width="auto" src={props.image} className={`${isCircle ? 'rounded-circle' : ''}`} />;
};
