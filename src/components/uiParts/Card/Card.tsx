import { ComponentProps, FC } from 'react';

import { Card as NextuiCard } from '@nextui-org/react';

type Props = ComponentProps<typeof NextuiCard>;

export const Card: FC<Props> = (props) => {
  return <Card {...props} />;
};
