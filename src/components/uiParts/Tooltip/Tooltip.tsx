import { FC, ComponentProps, ReactNode } from 'react';
import { Tooltip as NextuiTooltip } from '@nextui-org/react';

type Props = {
  children: ReactNode;
} & ComponentProps<typeof NextuiTooltip>;

export const Tooltip: FC<Props> = ({ children }) => {
  return <NextuiTooltip content={'Developers love Next.js'}>{children}</NextuiTooltip>;
};
