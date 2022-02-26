import { VFC, useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import styled from 'styled-components';
import { Icon } from '~/components/base/atoms/Icon';
import { IconButton } from '~/components/base/molecules/IconButton';
import { Page } from '~/domains/Page';

import { useLocale } from '~/hooks/useLocale';
import { useModal } from '~/hooks/useModal';

import { toastSuccess } from '~/utils/toastr';
import { zIndex } from '~/libs/constants/zIndex';

type Props = {
  page: Page;
  onClickFetchButton: () => void;
  direction?: 'up' | 'down' | 'start' | 'end';
};

export const PageManageDropdown: VFC<Props> = ({ page, onClickFetchButton, direction = 'start' }) => {
  const { t } = useLocale();
  const { handleModal } = useModal();

  /**
   * Twitter の共有
   */
  const sharePage = async () => {
    if (window != null) {
      const twitterUrl = new URL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url)}&hashtags=${page.siteName}`);
      window.open(twitterUrl.toString(), '_blank');
    }
  };

  /**
   * Web share api を使った共有
   */
  const sharePageByNavigator = () => {
    navigator.share({
      title: page.title,
      text: page.description,
      url: page.url,
    });
  };

  /**
   * Web share api が使えるかどうか(MobileかSafariだと使用可能)
   * @returns {boolean}
   */
  const canShareByNavigator = useMemo(() => {
    return !!navigator?.share;
  }, []);

  return (
    <UncontrolledDropdown direction={direction}>
      <DropdownToggle tag="span">
        <div id={`manage-for-${page._id}`}>
          <IconButton width={18} height={18} icon="THREE_DOTS_VERTICAL" color="WHITE" activeColor="WHITE" />
        </div>
      </DropdownToggle>
      <StyledDropdownMenu className="dropdown-menu-dark border-secondary" positionFixed container="body">
        <CopyToClipboard text={page.url || ''} onCopy={() => toastSuccess(t.toastr_success_copy_url)}>
          <DropdownItem>
            <Icon icon="CLIP_BOARD_PLUS" color="WHITE" />
            <span className="ms-2">{t.copy_url}</span>
          </DropdownItem>
        </CopyToClipboard>
        <DropdownItem tag="button" onClick={() => handleModal({ name: 'deletePageModal', args: { targetPage: page } })}>
          <Icon icon="TRASH" color="WHITE" />
          <span className="ms-2">{t.delete}</span>
        </DropdownItem>
        <DropdownItem tag="button" onClick={onClickFetchButton}>
          <Icon icon="ARROW_CLOCKWISE" color="WHITE" />
          <span className="ms-2">{t.fetch}</span>
        </DropdownItem>
        {canShareByNavigator ? (
          <DropdownItem tag="button" onClick={sharePageByNavigator}>
            <Icon icon="SHARE" color="WHITE" />
            <span className="ms-2">{t.share}</span>
          </DropdownItem>
        ) : (
          <DropdownItem tag="button" onClick={sharePage}>
            <Icon icon="TWITTER" color="WHITE" />
            <span className="ms-2">{t.share}</span>
          </DropdownItem>
        )}
      </StyledDropdownMenu>
    </UncontrolledDropdown>
  );
};

const StyledDropdownMenu = styled(DropdownMenu)`
  z-index: ${zIndex.DROPDOWN_MENU};
`;
