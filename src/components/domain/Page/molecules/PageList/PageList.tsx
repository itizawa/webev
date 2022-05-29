import { FC } from 'react';

import { Grid, Pagination } from '@nextui-org/react';
import { Page } from '~/domains/Page';
import { useOgpCardLayout } from '~/stores/contexts';
import { OgpLayoutType } from '~/libs/interfaces/contexts';

import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PageListItem } from '~/components/domain/Page/molecules/PageListItem';
import { PageCard } from '~/components/domain/Page/molecules/PageCard';

import { usePagePagination } from '~/hooks/Page';

type Props = {
  pages: Page[];
  totalPages: number;
};

export const PageList: FC<Props> = ({ pages, totalPages }) => {
  const { data: ogpCardLayout } = useOgpCardLayout();
  const { setActivePage } = usePagePagination();

  const handleMutateActivePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
  };

  return (
    <Grid.Container gap={1}>
      {pages.map((page) => {
        if (ogpCardLayout === OgpLayoutType.LIST) {
          return (
            <div className="col-12" key={page.id}>
              <PageListItem page={page} />
            </div>
          );
        }
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
