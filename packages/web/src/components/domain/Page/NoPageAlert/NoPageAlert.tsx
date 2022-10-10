import { VFC } from 'react';
import { Grid } from '@nextui-org/react';

import { useLocale } from '@webev/web/hooks/useLocale';
import { Text } from '@webev/web/components/uiParts';

export const NoPageAlert: VFC = () => {
  const { t } = useLocale();
  return (
    <Grid css={{ textAlign: 'center', width: '100%' }}>
      <Text h3>{t.no_page_alert}</Text>
    </Grid>
  );
};
