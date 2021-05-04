import { VFC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { Icon } from '~/components/Icons/Icon';

import { useDirectoryListSWR } from '~/stores/directory';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = useDirectoryListSWR();

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        <div className="d-flex align-items-center">
          <h1>{t.directory}</h1>
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
                  </StyledList>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
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

export default Index;
