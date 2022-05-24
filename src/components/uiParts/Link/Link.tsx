import { ComponentProps, FC } from 'react';

import NextLink from 'next/link';
import { Link as NextuiLink } from '@nextui-org/react';

type Props = {
  href: string;
  locale?: 'ja' | 'en';
} & ComponentProps<typeof NextuiLink>;

export const Link: FC<Props> = ({ href, locale, children, ...rest }) => {
  return (
    <NextLink href={href} locale={locale}>
      <NextuiLink {...rest}>{children}</NextuiLink>
    </NextLink>
  );
};
