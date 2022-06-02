import Image from 'next/image';
import { VFC } from 'react';
import { Grid } from '@nextui-org/react';
import { imagePath } from '~/libs/constants/imagePath';

import { useLocale } from '~/hooks/useLocale';
import { Text } from '~/components/uiParts';

export const NoPageAlert: VFC = () => {
  const { t } = useLocale();

  return (
    <Grid css={{ textAlign: 'center' }}>
      <Grid css={{ my: '$10', width: '40%', mx: 'auto' }}>
        <Image src={imagePath.NO_PAGE} height={958} width={1000} />
      </Grid>
      <Text h3>{t['your_pages_don’t_exist']}</Text>
    </Grid>
  );
};
