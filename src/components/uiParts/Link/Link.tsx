import { ComponentProps, FC, HTMLAttributeAnchorTarget } from 'react';

import NextLink from 'next/link';
import { Link as NextuiLink } from '@nextui-org/react';

type Props = {
  href: string;
  locale?: 'ja' | 'en';
  target?: HTMLAttributeAnchorTarget;
} & ComponentProps<typeof NextuiLink>;

export const Link: FC<Props> = ({ href, locale, target, children, ...rest }) => {
  return (
    <NextLink href={href} locale={locale} target={target}>
      <NextuiLink {...rest}>{children}</NextuiLink>
    </NextLink>
  );
};
