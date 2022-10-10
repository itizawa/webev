import { ComponentProps, FC } from 'react';

import { Image as NextuiImage } from '@nextui-org/react';

type Props = ComponentProps<typeof NextuiImage>;

export const Image: FC<Props> = (props) => {
  return <NextuiImage {...props} />;
};
