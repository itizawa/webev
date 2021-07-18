import { VFC } from 'react';

import { Page } from '~/domains/Page';
import { useOgpCardLayout } from '~/stores/contexts';
import { OgpLayoutType } from '~/interfaces/contexts';

import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { PageListItem } from '~/components/domain/Page/molecules/PageListItem';
import { PageCard } from '~/components/domain/Page/molecules/PageCard';

import { useActivePage } from '~/stores/page';

type Props = {
  pages: Page[];
  pagingLimit: number;
  totalItemsCount: number;
  isHideArchiveButton?: boolean;
};

export const PageList: VFC<Props> = (props) => {
  const { pages, pagingLimit, totalItemsCount, isHideArchiveButton } = props;
  const { data: ogpCardLayout } = useOgpCardLayout();
  const { data: activePage = 1, mutate: mutateActivePage } = useActivePage();

  return (
    <div className="row">
      {pages.map((page) => {
        if (ogpCardLayout === OgpLayoutType.LIST) {
          return (
            <div className="col-12" key={page._id}>
              <PageListItem page={page} isHideArchiveButton={isHideArchiveButton} />
            </div>
          );
        }
        return (
          <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
            <PageCard page={page} isHideArchiveButton={isHideArchiveButton} />
          </div>
        );
      })}
      {pages.length === 0 ? (
        <div className="col-12">
          <NoPageAlert />
        </div>
      ) : (
        <div className="text-center">
          <PaginationWrapper pagingLimit={pagingLimit} totalItemsCount={totalItemsCount} activePage={activePage} mutateActivePage={mutateActivePage} />
        </div>
      )}
    </div>
  );
};
