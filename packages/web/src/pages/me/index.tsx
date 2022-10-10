import { ReactNode } from 'react';

import { Button, Card, Grid } from '@nextui-org/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { LoginRequiredWrapper } from '@webev/web/components/common/Authentication/LoginRequiredWrapper';
import { useLocale } from '@webev/web/hooks/useLocale';

import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';
import { DashBoardLayout } from '@webev/web/components/common/Layout/DashBoardLayout';

import { URLS } from '@webev/web/libs/constants/urls';
import { useCurrentUser } from '@webev/web/stores/User';

import { Avatar, Loading, Text } from '@webev/web/components/uiParts';
import { usePagesCountByUserId } from '@webev/web/stores/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { data: count } = usePagesCountByUserId(currentUser?.id);

  if (isLoadingCurrentUser) {
    return (
      <Grid css={{ display: 'flex', justifyContent: 'center' }}>
        <Loading color="secondary" size="xl" />
      </Grid>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user}${t.settings}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', pt: '$10' }}>
          <Card css={{ overflow: 'unset', maxWidth: '500px' }} variant="bordered">
            <Card.Body css={{ overflow: 'unset' }}>
              <Grid
                css={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, -50px)',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
              >
                <Avatar text={currentUser.username} src={currentUser.profileUrl} bordered color="gradient" as="div" size="xl" />
              </Grid>
              <Text h3 css={{ mt: '$10', textAlign: 'center' }}>
                {currentUser.username}
              </Text>
              <Grid css={{ mt: '$10', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>{t.total_page_count}</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>{count} Page</Text>
              </Grid>
              <Grid css={{ mt: '$4', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>{t.registered_day}</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>
                  {format(new Date(currentUser.createdAt), 'yyyy/MM/dd HH:hh:ss')}
                </Text>
              </Grid>
              <Grid css={{ mt: '$4', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>{t.email}</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>{currentUser.email}</Text>
              </Grid>
              <Grid css={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Link href={URLS.LOGOUT_URL_TO_BACKEND}>
                  <a>
                    <Button color="secondary" css={{ fontWeight: '$bold' }}>
                      {t.logout}
                    </Button>
                  </a>
                </Link>
              </Grid>
            </Card.Body>
          </Card>
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
