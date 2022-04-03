import { VFC } from 'react';

import { Page } from '@monorepo/webev-client/src/domains/Page';
import { useOgpCardLayout } from '@monorepo/webev-client/src/stores/contexts';
import { OgpLayoutType } from '@monorepo/webev-client/src/libs/interfaces/contexts';

import { NoPageAlert } from '@monorepo/webev-client/src/components/domain/Page/molecules/NoPageAlert';
import { PaginationWrapper } from '@monorepo/webev-client/src/components/common/Parts/PaginationWrapper';
import { PageListItem } from '@monorepo/webev-client/src/components/domain/Page/molecules/PageListItem';
import { PageCard } from '@monorepo/webev-client/src/components/domain/Page/molecules/PageCard';

import { usePagePagination } from '@monorepo/webev-client/src/hooks/Page';

type Props = {
  pages: Page[];
  pagingLimit: number;
  totalItemsCount: number;
};

export const PageList: VFC<Props> = ({ pages, pagingLimit, totalItemsCount }) => {
  const { data: ogpCardLayout } = useOgpCardLayout();
  const { activePage, setActivePage } = usePagePagination();

  const handleMutateActivePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
  };

  return (
    <div className="row">
      {pages.map((page) => {
        if (ogpCardLayout === OgpLayoutType.LIST) {
          return (
            <div className="col-12" key={page._id}>
              <PageListItem page={page} />
            </div>
          );
        }
        return (
          <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
            <PageCard page={page} />
          </div>
        );
      })}
      {pages.length === 0 ? (
        <div className="col-12">
          <NoPageAlert />
        </div>
      ) : (
        <div className="text-center">
          <PaginationWrapper
            pagingLimit={pagingLimit}
            totalItemsCount={totalItemsCount}
            activePage={activePage}
            mutateActivePage={handleMutateActivePage}
          />
        </div>
      )}
    </div>
  );
};
