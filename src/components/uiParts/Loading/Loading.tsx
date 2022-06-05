import { Loading as NextuiLoading } from '@nextui-org/react';
import { ComponentProps, FC } from 'react';

type Props = ComponentProps<typeof NextuiLoading>;

export const Loading: FC<Props> = (props) => {
  return <NextuiLoading {...props} />;
};
