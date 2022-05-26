import { Loading as NextuiAvatar } from '@nextui-org/react';
import { ComponentProps, FC } from 'react';

type Props = ComponentProps<typeof NextuiAvatar>;

export const Avatar: FC<Props> = (props) => {
  return <NextuiAvatar {...props} />;
};
