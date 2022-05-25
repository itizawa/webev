import { ComponentProps, FC } from 'react';

import { Card as NextuiText } from '@nextui-org/react';

type Props = ComponentProps<typeof NextuiText>;

export const Text: FC<Props> = (props) => {
  return <NextuiText {...props} />;
};
