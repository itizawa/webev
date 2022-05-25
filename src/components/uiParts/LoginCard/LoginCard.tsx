import { Card, Grid } from '@nextui-org/react';
import { FC } from 'react';

import { signIn } from 'next-auth/react';
import { useLocale } from '~/hooks/useLocale';
import { imagePath } from '~/libs/constants/imagePath';
import { Text, Image } from '~/components/uiParts';

type Props = {};

export const LoginCard: FC<Props> = () => {
  const { t } = useLocale();

  return (
    <Card css={{ bgColor: '$gray100', p: '$10' }}>
      <Text h3>🎉 {t.welcome_webev} 🎉</Text>
      <Text css={{ mt: '$4' }}>{t.tutorial_desc1}</Text>
      <Text dangerouslySetInnerHTML={{ __html: t.login_description }} />
      <Grid
        css={{
          textAlign: 'center',
          mt: '$8',
        }}
      >
        <Image
          src={imagePath.SIGN_IN_GOOGLE}
          height={46}
          width={191}
          onClick={() => signIn('google')}
          css={{
            cursor: 'pointer',
            '&:hover': {
              opacity: '.8',
            },
          }}
        />
      </Grid>
    </Card>
  );
};
