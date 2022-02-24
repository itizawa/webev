import { VFC } from 'react';

import styled from 'styled-components';

import { useHooks } from './hooks';

import { Page } from '~/domains/Page';
import { usePageForAddToDirectory, usePageForDelete } from '~/stores/modal';

import { Icon } from '~/components/base/atoms/Icon';
import { PageManageDropdown } from '~/components/domain/Page/molecules/PageManageDropdown';
import { useLocale } from '~/hooks/useLocale';

import { zIndex } from '~/libs/constants/zIndex';
import { IconButton } from '~/components/base/molecules/IconButton';
import { speech } from '~/utils/services';

type Props = {
  page: Page;
  onClickRemovePageButton: () => void;
  onClickSwitchArchiveButton: () => void;
  onClickFetchButton: () => void;
  onClickPlayButton: () => void;
  onClickPauseButton: () => void;
  onClickStopButton: () => void;
  isReading: boolean;
};
export const TopSubnavBar: VFC<Props> = ({
  page,
  onClickRemovePageButton,
  onClickSwitchArchiveButton,
  onClickFetchButton,
  onClickPlayButton,
  onClickPauseButton,
  onClickStopButton,
  isReading,
}) => {
  const { t } = useLocale();
  const { isShowScroll } = useHooks();

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
        <div className="ms-auto me-2">
          {speech.isEnabled && page.body && (
            <>
              {isReading ? (
                <IconButton icon="PAUSE_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={onClickPauseButton} />
              ) : (
                <IconButton icon="PLAY_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={onClickPlayButton} />
              )}
              <IconButton icon="STOP_CIRCLE" color="WHITE" activeColor="SUCCESS" width={24} height={24} isRemovePadding onClickButton={onClickStopButton} />
            </>
          )}
        </div>
        <button className="btn btn-sm btn-primary d-flex" onClick={onClickSwitchArchiveButton}>
          <Icon height={20} width={20} icon="CHECK" color="WHITE" />
          <span className="ms-2 text-nowrap">{t.read_button}</span>
        </button>
        <div className="ms-2">
          <PageManageDropdown
            page={page}
            onClickDeleteButton={openDeleteModal}
            onClickRemovePageButton={onClickRemovePageButton}
            onClickAddPageToDirectoryButton={handleClickAddPageToDirectoryButton}
            onClickFetchButton={onClickFetchButton}
            direction="down"
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
