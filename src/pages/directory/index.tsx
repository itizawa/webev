import { VFC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
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
                  <StyledImageWrapper>
                    <Link href={`/directory/${directory._id}`}>
                      <a>
                        <img src="/images/no-page.png" alt={directory.name} />
                      </a>
                    </Link>
                  </StyledImageWrapper>
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

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 55%;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
