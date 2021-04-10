import { VFC } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { useDirectoryListSWR } from '~/stores/directory';

const Index: VFC = () => {
  const { t } = useTranslation();

  const { data: paginationResult } = useDirectoryListSWR();

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1>{t('directory')}</h1>
          </div>
          {paginationResult != null && (
            <div className="row">
              {paginationResult.docs.map((directory) => (
                <div className="col-xl-4 col-md-6 mb-3" key={directory._id}>
                  {directory.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export default Index;
