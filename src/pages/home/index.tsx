import { ReactNode, useEffect } from 'react';

import { Grid } from '@nextui-org/react';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '~/hooks/Page';
import { useLocale } from '~/hooks/useLocale';
import { SortButtonGroup } from '~/components/domain/Page';
import { Loading, Text } from '~/components/uiParts';
import { PageList } from '~/components/domain/Page/molecules/PageList';

const Index: WebevNextPage = () => {
  const { t } = useLocale();
  const { paginationPage, setIsArchived, isLoadingPaginationPage } = usePagePagination();

  useEffect(() => {
    setIsArchived(false);
  }, [setIsArchived]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.home}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%', px: '$8' }}>
          <Grid css={{ display: 'flex', alignItems: 'center' }}>
            <Text h2>{t.home}</Text>
            <Grid css={{ ml: 'auto', fontWeight: '$bold', color: '$white' }}>{paginationPage?.totalDocs} Pages</Grid>
          </Grid>
          <Grid css={{ display: 'flex', justifyContent: 'end' }}>
            {/* <SearchTextBox /> */}
            <SortButtonGroup />
          </Grid>
          {isLoadingPaginationPage ? (
            <Grid css={{ display: 'flex', justifyContent: 'center' }}>
              <Loading size="lg" color="secondary" />
            </Grid>
          ) : (
            <>{paginationPage && <PageList pages={paginationPage?.docs} totalPages={paginationPage.totalPages} />}</>
          )}
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
