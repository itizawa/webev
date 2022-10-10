import { ReactNode } from 'react';

import { Grid } from '@nextui-org/react';
import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';

import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { LoginRequiredWrapper } from '@webev/web/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '@webev/web/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '@webev/web/hooks/Page';
import { useLocale } from '@webev/web/hooks/useLocale';
import { SortButtonGroup, PageList, FilterIsReadDropdown } from '@webev/web/components/domain/Page';
import { Loading, Text, SearchTextBox } from '@webev/web/components/uiParts';

const Index: WebevNextPage = () => {
  const { t } = useLocale();
  const { paginationPage, isLoadingPaginationPage } = usePagePagination();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.home}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%' }}>
          <Grid css={{ display: 'flex', alignItems: 'center' }}>
            <Text h2>{t.home}</Text>
            <Grid css={{ ml: 'auto', fontWeight: '$bold', color: '$white' }}>{paginationPage?.totalDocs} Pages</Grid>
          </Grid>
          <Grid
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              '@smMax': {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'left',
              },
              gap: '$4',
              alignItems: 'center',
            }}
          >
            <SearchTextBox />
            <Grid
              css={{
                ml: 'auto',
                '@smMax': { ml: '0' },
                display: 'flex',
                gap: '$4',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FilterIsReadDropdown />
              <SortButtonGroup />
            </Grid>
          </Grid>
          {isLoadingPaginationPage ? (
            <Grid css={{ display: 'flex', justifyContent: 'center', pt: '16px' }}>
              <Loading size="lg" color="secondary" />
            </Grid>
          ) : (
            <Grid css={{ py: '$8' }}>
              {paginationPage && (
                <PageList pages={paginationPage?.docs} totalPages={paginationPage.totalPages} activePage={paginationPage.page} />
              )}
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
