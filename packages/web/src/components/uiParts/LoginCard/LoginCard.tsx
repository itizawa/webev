import NextLink from 'next/link';
import { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';

import { useLocale } from '@webev/web/hooks/useLocale';
import { imagePath } from '@webev/web/libs/constants/imagePath';
import { Text, Image } from '@webev/web/components/uiParts';
import { URLS } from '@webev/web/libs/constants/urls';

export const LoginCard: FC = () => {
  const { t } = useLocale();

  return (
    <Card css={{ bgColor: '$gray100', p: '$10', textAlign: 'center' }}>
      <Text h3>🎉 {t.welcome_webev} 🎉</Text>
      <Text css={{ mt: '$4' }}>{t.tutorial_desc1}</Text>
      <Text dangerouslySetInnerHTML={{ __html: t.login_description }} />
      <Grid
        css={{
          textAlign: 'center',
          mt: '$8',
        }}
      >
        <NextLink href={URLS.LOGIN_URL_TO_BACKEND}>
          <a>
            <Image
              src={imagePath.SIGN_IN_GOOGLE}
              height={46}
              width={191}
              css={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: '.8',
                },
              }}
            />
          </a>
        </NextLink>
      </Grid>
    </Card>
  );
};
