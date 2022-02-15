import { VFC } from 'react';

import styled from 'styled-components';

import { useHooks } from './hooks';

import { Page, PageStatus } from '~/domains/Page';
import { usePageForAddToDirectory, usePageForDelete } from '~/stores/modal';

import { Icon } from '~/components/base/atoms/Icon';
import { PageManageDropdown } from '~/components/domain/Page/molecules/PageManageDropdown';
import { useLocale } from '~/hooks/useLocale';

import { zIndex } from '~/libs/constants/zIndex';

type Props = {
  page: Page;
  onClickRemovePageButton: () => void;
  onClickSwitchArchiveButton: () => void;
  onClickFetchButton: () => void;
};
export const TopSubnavBar: VFC<Props> = ({ page, onClickRemovePageButton, onClickSwitchArchiveButton, onClickFetchButton }) => {
  const { t } = useLocale();
  const { isShowScroll } = useHooks();
  const isArchived = page.status === PageStatus.PAGE_STATUS_ARCHIVE;

  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: mutateUsePageForAddToDirectory } = usePageForAddToDirectory();

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
  };

  const handleClickAddPageToDirectoryButton = () => {
    mutateUsePageForAddToDirectory(page);
  };

  return (
    <StyledDiv $isShow={isShowScroll} className="fixed-top">
      <div className="bg-dark d-flex justify-content-evenly align-items-center p-2">
        <div className="me-2">
          <StyledAnchor className="webev-limit-2lines text-white webev-anchor" href={page.url} target="blank" rel="noopener noreferrer">
            {page.title}
          </StyledAnchor>
        </div>
        {isArchived ? (
          <button className="btn btn-sm btn-secondary d-flex ms-auto" onClick={onClickSwitchArchiveButton}>
            <Icon height={20} width={20} icon="REPLY" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.return_button}</span>
          </button>
        ) : (
          <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={onClickSwitchArchiveButton}>
            <Icon height={20} width={20} icon="CHECK" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.read_button}</span>
          </button>
        )}
        <div className="ms-2">
          <PageManageDropdown
            page={page}
            onClickDeleteButton={openDeleteModal}
            onClickSwitchArchiveButton={onClickSwitchArchiveButton}
            onClickRemovePageButton={onClickRemovePageButton}
            onClickAddPageToDirectoryButton={handleClickAddPageToDirectoryButton}
            onClickFetchButton={onClickFetchButton}
          />
        </div>
      </div>
      <StyledBorder />
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ $isShow: boolean }>`
  -webkit-transition: -webkit-transform 0.4s ease;
  transition: -webkit-transform 0.4s ease;
  transition: transform 0.4s ease;
  transition: transform 0.4s ease, -webkit-transform 0.4s ease;
  transform: translateY(-150%);

  ${(props) =>
    props.$isShow &&
    `
    -webkit-transform: translateY(0);
    transform: translateY(0);
  `}
`;

const StyledAnchor = styled.a`
  font-size: 12px;
`;

const StyledBorder = styled.div`
  z-index: ${zIndex.TOP_BORDER};
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
