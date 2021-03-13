import { VFC } from 'react';

type Props = {
  image: string;
  size: 'small' | 'medium' | 'large';
};

export const UserIcon: VFC<Props> = (props: Props) => {
  const { size } = props;
  let height;
  switch (size) {
    case 'small':
      height = '16px';
      break;
    case 'medium':
      height = '32px';
      break;
    case 'large':
      height = '46px';
      break;
  }

  return <img height={height} width="auto" src={props.image} />;
};
