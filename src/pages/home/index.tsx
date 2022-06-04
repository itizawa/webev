import { ReactNode, useEffect } from 'react';

import { Grid } from '@nextui-org/react';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '~/hooks/Page';
import { useLocale } from '~/hooks/useLocale';
import { SortButtonGroup, PageList } from '~/components/domain/Page';
import { Loading, Text, SearchTextBox } from '~/components/uiParts';

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
          <Grid
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '@xsMax': { flexDirection: 'column', alignItems: 'start', rowGap: '$4' },
            }}
          >
            <SearchTextBox />
            <SortButtonGroup />
          </Grid>
          {isLoadingPaginationPage ? (
            <Grid css={{ display: 'flex', justifyContent: 'center' }}>
              <Loading size="lg" color="secondary" />
            </Grid>
          ) : (
            <Grid css={{ py: '$8' }}>
              {paginationPage && <PageList pages={paginationPage?.docs} totalPages={paginationPage.totalPages} />}
            </Grid>
          )}
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
