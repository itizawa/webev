import { ReactNode, useEffect } from 'react';

import { Grid } from '@nextui-org/react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/domain/Page/SortButtonGroup/SortButtonGroup';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { Loading, SearchTextBox, Text } from '~/components/uiParts';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '~/hooks/Page';
import { PageList } from '~/components/domain/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { paginationPage, setIsArchived, isLoadingPaginationPage } = usePagePagination();

  useEffect(() => {
    setIsArchived(true);
  }, [setIsArchived]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.read}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%' }}>
          <Grid css={{ display: 'flex', alignItems: 'center' }}>
            <Text h2>{t.read}</Text>
            <Grid css={{ ml: 'auto', fontWeight: '$bold', color: '$white' }}>{paginationPage?.totalDocs} Pages</Grid>
          </Grid>
          <Grid css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

Page.getLayout = getLayout;
export default Page;
