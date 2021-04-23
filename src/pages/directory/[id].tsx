import { VFC } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { useLocale } from '~/hooks/useLocale';

import { useDirectoryInfomation } from '~/stores/directory';
import { useDirectoryId, useIsRetrieveFavoritePageList, usePageListSWR } from '~/stores/page';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { OgpCard } from '~/components/organisms/OgpCard';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { IconButton } from '~/components/Icons/IconButton';

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { id } = router.query;
  const { mutate: mutateDirectoryId } = useDirectoryId();
  const { data: isRetrieveFavoritePageList, mutate: mutateIsRetrieveFavoritePageList } = useIsRetrieveFavoritePageList();

  mutateDirectoryId(id as string);
  const { data: directory } = useDirectoryInfomation(id as string);
  const { data: paginationResult } = usePageListSWR();

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          {directory != null && (
            <div className="d-flex align-items-center">
              <div>
                <small>
                  <Link href="/directory">
                    <a className="text-decoration-none text-white">Directory</a>
                  </Link>
                  <span className="ms-1">{'/'}</span>
                </small>
                <h1>{directory?.name}</h1>
              </div>
              <div className="ms-auto">
                <IconButton
                  width={18}
                  height={18}
                  icon={BootstrapIcon.THREE_DOTS_HORIZONAL}
                  color={BootstrapColor.SECONDARY}
                  activeColor={BootstrapColor.WARNING}
                />
              </div>
            </div>
          )}
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
                <NoPageAlert />
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
