import { Button, Grid, Popover } from '@nextui-org/react';
import { FC, useCallback, useMemo, useState } from 'react';
import { Icon } from '~/components/base/atoms/Icon';

import { Page } from '~/domains/Page';
import { useSwitchArchive } from '~/hooks/Page';
import { useClipboard } from '~/hooks/shared';
import { useLocale } from '~/hooks/useLocale';
import { toastError, toastSuccess } from '~/utils/toastr';

type Props = {
  page: Page;
};

export const PageManageDropdown: FC<Props> = ({ page }) => {
  const { t } = useLocale();
  const { handleCopy } = useClipboard();
  const [isLoading, setIsLoading] = useState(false);

  // const { handleModal } = useModal();
  const { switchArchive } = useSwitchArchive();

  const handleClickCancelArchiveButton = useCallback(async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        await switchArchive(page.id, false);
        setIsLoading(false);
      }, 500);
      toastSuccess(t.toastr_success_put_back);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [page.id, switchArchive, t.toastr_success_put_back]);

  /**
   * Twitter の共有
   */
  const sharePage = useCallback(async () => {
    if (window != null) {
      const twitterUrl = new URL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url)}&hashtags=${page.siteName}`);
      window.open(twitterUrl.toString(), '_blank');
    }
  }, [page.siteName, page.url]);

  /**
   * Web share api を使った共有
   */
  const sharePageByNavigator = useCallback(() => {
    navigator.share({
      title: page.title,
      text: page.description,
      url: page.url,
    });
  }, [page.description, page.title, page.url]);

  /**
   * Web share api が使えるかどうか(MobileかSafariだと使用可能)
   * @returns {boolean}
   */
  const canShareByNavigator = useMemo(() => {
    return !!navigator?.share;
  }, []);

  return (
    <Popover placement="bottom-right">
      <Popover.Trigger>
        <Button auto css={{ padding: '0px 11px' }} light>
          <Icon width={18} height={18} icon="THREE_DOTS_VERTICAL" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Grid css={{ p: '$8', display: 'flex', flexDirection: 'column', gridRowGap: '16px' }}>
          <Button
            icon={<Icon icon="CLIP_BOARD_PLUS" />}
            light
            css={{ fontWeight: '$bold' }}
            onClick={() => {
              handleCopy(page.url);
              toastSuccess(t.toastr_success_copy_url);
            }}
          >
            {t.copy_url}
          </Button>
          {page.archivedAt && (
            <Button
              icon={<Icon icon="REPLY" />}
              light
              css={{ fontWeight: '$bold' }}
              onClick={handleClickCancelArchiveButton}
              disabled={isLoading}
            >
              {t.return_button}
            </Button>
          )}
          <Button
            icon={<Icon icon={canShareByNavigator ? 'SHARE' : 'TWITTER'} />}
            light
            css={{ fontWeight: '$bold' }}
            onClick={canShareByNavigator ? sharePageByNavigator : sharePage}
          >
            {t.share}
          </Button>
        </Grid>
      </Popover.Content>
    </Popover>
  );

  //       <DropdownItem tag="button" onClick={() => handleModal({ name: 'deletePageModal', args: { targetPage: page } })}>
  //         <Icon icon="TRASH" />
  //         <span className="ms-2">{t.delete}</span>
  //       </DropdownItem>

  //       {/* TODO: implement */}
  //       {/* <DropdownItem tag="button" onClick={onClickFetchButton}>
  //         <Icon icon="ARROW_CLOCKWISE"  />
  //         <span className="ms-2">{t.fetch}</span>
  //       </DropdownItem> */}
  //     </DropdownMenu>
};
