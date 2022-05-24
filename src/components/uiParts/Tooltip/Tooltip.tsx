import { FC, ComponentProps, ReactNode } from 'react';
import { Tooltip as NextuiTooltip } from '@nextui-org/react';

type Props = {
  children: ReactNode;
} & ComponentProps<typeof NextuiTooltip>;

export const Tooltip: FC<Props> = ({ children, color = 'secondary', ...props }) => {
  return (
    <NextuiTooltip shadow color={color} {...props}>
      {children}
    </NextuiTooltip>
  );
};
