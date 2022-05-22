import { ComponentProps, FC } from 'react';

import NextLink from 'next/link';
import { Link as NextuiLink } from '@nextui-org/react';

type Props = {
  href: string;
} & ComponentProps<typeof NextuiLink>;

export const Link: FC<Props> = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href}>
      <NextuiLink {...rest}>{children}</NextuiLink>
    </NextLink>
  );
};
