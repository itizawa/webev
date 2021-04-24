import { VFC } from 'react';

import { useIsRetrieveFavoritePageList, usePageListSWR } from '~/stores/page';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { useLocale } from '~/hooks/useLocale';

import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { IconButton } from '~/components/Icons/IconButton';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = usePageListSWR();
  const { data: isRetrieveFavoritePageList, mutate: mutateIsRetrieveFavoritePageList } = useIsRetrieveFavoritePageList();

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1>{t.home}</h1>
            <div className="ms-auto">
              <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
            </div>
          </div>
          <div className="my-2 d-flex">
            <div className="ms-auto me-3">
              <IconButton
                icon={BootstrapIcon.STAR}
                isActive={isRetrieveFavoritePageList}
                color={BootstrapColor.SECONDARY}
                activeColor={BootstrapColor.WARNING}
                onClickButton={() => mutateIsRetrieveFavoritePageList(!isRetrieveFavoritePageList)}
                buttonSize="sm"
                text={t.only_favorite}
              />
            </div>
            <SortButtonGroup />
          </div>
          {paginationResult != null && (
            <div className="row">
              {paginationResult.docs.map((page) => (
                <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                  <OgpCard page={page} />
                </div>
              ))}
              {paginationResult.docs.length === 0 ? (
                <div className="col-12">
                  <NoPageAlert />
                </div>
              ) : (
                <div className="text-center">
                  <PaginationWrapper pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
                </div>
              )}
            </div>
          )}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
