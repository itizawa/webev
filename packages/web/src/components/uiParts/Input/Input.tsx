import { Input as NextuiInput } from '@nextui-org/react';
import { ComponentProps, FC } from 'react';

type Props = ComponentProps<typeof NextuiInput>;

export const Input: FC<Props> = (props) => {
  return <NextuiInput {...props} />;
};
