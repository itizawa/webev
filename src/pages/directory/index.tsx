import { VFC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { Icon } from '~/components/Icons/Icon';

import { useDirectoryListSWR } from '~/stores/directory';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

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
                  <Link href={`/directory/${directory._id}`}>
                    <StyledList className="list-group-item border-0 d-flex">
                      <div>
                        <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
                        <span className="ms-3" role="button">
                          {directory.name}
                        </span>
                      </div>
                      <div className="ms-auto">
                        <span className="badge rounded-pill bg-secondary text-white">{directory.pages.length} Pages</span>
                      </div>
                    </StyledList>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

const StyledList = styled.li<{ isActive?: boolean }>`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  ${({ isActive }) =>
    isActive
      ? `
    margin-top: 0px;
    background-color: #00acc1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export default Index;
