import { VFC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Icon } from '~/components/base/atoms/Icon';
import { IconButton } from '~/components/base/molecules/IconButton';
import { Page, PageStatus } from '~/domains/Page';
import { useLocale } from '~/hooks/useLocale';
import { toastSuccess } from '~/utils/toastr';

type Props = {
  page: Page;
  isHideArchiveButton?: boolean;
  onClickDeleteButton: () => void;
  onClickSwitchArchiveButton?: () => void;
  onClickRemovePageButton: () => void;
};

export const PageManageDropdown: VFC<Props> = ({ page, isHideArchiveButton, onClickDeleteButton, onClickSwitchArchiveButton, onClickRemovePageButton }) => {
  const { t } = useLocale();

  const sharePage = async () => {
    if (window != null) {
      const twitterUrl = new URL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url)}&hashtags=${page.siteName}`);
      window.open(twitterUrl.toString(), '_blank');
    }
  };

  return (
    <UncontrolledDropdown direction="left">
      <DropdownToggle tag="span">
        <div id={`manage-for-${page._id}`}>
          <IconButton width={18} height={18} icon="THREE_DOTS_VERTICAL" color="WHITE" activeColor="WHITE" />
        </div>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-dark" positionFixed>
        <CopyToClipboard text={page.url || ''} onCopy={() => toastSuccess(t.toastr_success_copy_url)}>
          <DropdownItem>
            <Icon icon="CLIP_BOARD_PLUS" color="WHITE" />
            <span className="ms-2">{t.copy_url}</span>
          </DropdownItem>
        </CopyToClipboard>
        <DropdownItem tag="button" onClick={onClickDeleteButton}>
          <Icon icon="TRASH" color="WHITE" />
          <span className="ms-2">{t.delete}</span>
        </DropdownItem>
        <DropdownItem tag="button" onClick={sharePage}>
          <Icon icon="TWITTER" color="WHITE" />
          <span className="ms-2">{t.share}</span>
        </DropdownItem>
        {!isHideArchiveButton && page.status === PageStatus.PAGE_STATUS_ARCHIVE && (
          <DropdownItem tag="button" onClick={onClickSwitchArchiveButton}>
            <Icon height={20} width={20} icon="REPLY" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.return_button}</span>
          </DropdownItem>
        )}
        {page.directoryId != null && (
          <DropdownItem tag="button" onClick={onClickRemovePageButton}>
            <Icon icon="REMOVE_FROM_DIRECTORY" color="WHITE" />
            <span className="ms-2">{t.remove_page_from_directory}</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
