import { VFC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';

const Index: VFC = () => {
  const { t } = useTranslation();
  const { data: paginationResult } = usePageListSWR();

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <h1>{t('favorite')}</h1>
          <div className="my-2 d-flex flex-row-reverse">
            <SortButtonGroup />
          </div>
          <div className="row">
            {paginationResult == null ? (
              [...Array(9)].map((_, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <Skeleton height={300} />
                </div>
              ))
            ) : (
              <>
                {paginationResult.docs.map((page) => (
                  <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                    <OgpCard page={page} />
                  </div>
                ))}
                {paginationResult.docs.length === 0 ? (
                  <div className="text-center alert alert-info">
                    <h2>{t('the_page_is_not_saved')}</h2>
                    <span>{t('save_the_url_immediately')}</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <PaginationWrapper pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Index;
