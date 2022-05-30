import { FC } from 'react';

import { Grid, Pagination } from '@nextui-org/react';
import { Page } from '~/domains/Page';

import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PageCard } from '~/components/domain/Page/molecules/PageCard';

import { usePagePagination } from '~/hooks/Page';

type Props = {
  pages: Page[];
  totalPages: number;
};

export const PageList: FC<Props> = ({ pages, totalPages }) => {
  const { setActivePage } = usePagePagination();

  const handleMutateActivePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
  };

  return (
    <Grid.Container gap={1}>
      {pages.map((page) => {
        return (
          <Grid key={page.id} xs={12} sm={6} md={4} xl={3}>
            <PageCard page={page} />
          </Grid>
        );
      })}
      {pages.length === 0 ? (
        <Grid xs={12}>
          <NoPageAlert />
        </Grid>
      ) : (
        <Grid xs={12} css={{ display: 'flex', justifyContent: 'center', mt: '$10' }}>
          <Pagination shadow color="secondary" total={totalPages} onChange={handleMutateActivePage} />
        </Grid>
      )}
    </Grid.Container>
  );
};
