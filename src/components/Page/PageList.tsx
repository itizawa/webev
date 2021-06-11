import { VFC } from 'react';

import { Page } from '~/domains/Page';
import { useOgpCardLayout } from '~/stores/contexts';
import { OgpLayoutType } from '~/interfaces/contexts';

import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { OgpListItem } from '~/components/organisms/OgpListItem';
import { OgpCard } from '~/components/organisms/OgpCard';

type Props = {
  pages: Page[];
  pagingLimit: number;
  totalItemsCount: number;
};

export const PageList: VFC<Props> = (props) => {
  const { pages, pagingLimit, totalItemsCount } = props;
  const { data: ogpCardLayout } = useOgpCardLayout();

  return (
    <div className="row">
      {pages.map((page) => {
        if (ogpCardLayout === OgpLayoutType.LIST) {
          return (
            <div className="col-12" key={page._id}>
              <OgpListItem page={page} />
            </div>
          );
        }
        return (
          <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
            <OgpCard page={page} />
          </div>
        );
      })}
      {pages.length === 0 ? (
        <div className="col-12">
          <NoPageAlert />
        </div>
      ) : (
        <div className="text-center">
          <PaginationWrapper pagingLimit={pagingLimit} totalItemsCount={totalItemsCount} />
        </div>
      )}
    </div>
  );
};
