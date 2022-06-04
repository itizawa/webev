import { VFC } from 'react';

import { Page } from '~/domains/Page';

type Props = {
  page: Page;
  direction?: 'up' | 'down' | 'start' | 'end';
};

export const PageManageDropdown: VFC<Props> = () => {
  // const { t } = useLocale();
  // const { handleModal } = useModal();
  // const { switchArchive } = useSwitchArchive();

  return null;
  // const { pagePagination, mutatePagePagination } = usePagePagination();

  // const handleClickCancelArchiveButton = useCallback(async () => {
  //   try {
  //     await switchArchive(page.id, false);
  //     if (pagePagination) {
  //       mutatePagePagination(
  //         {
  //           ...pagePagination,
  //           docs: pagePagination.docs.filter((v) => v._id !== page.id),
  //         },
  //         false,
  //       );
  //     }
  //     toastSuccess(t.toastr_success_put_back);
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // }, [mutatePagePagination, page.id, pagePagination, switchArchive, t.toastr_success_put_back]);

  // /**
  //  * Twitter の共有
  //  */
  // const sharePage = useCallback(async () => {
  //   if (window != null) {
  //     const twitterUrl = new URL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url)}&hashtags=${page.siteName}`);
  //     window.open(twitterUrl.toString(), '_blank');
  //   }
  // }, [page.siteName, page.url]);

  // /**
  //  * Web share api を使った共有
  //  */
  // const sharePageByNavigator = useCallback(() => {
  //   navigator.share({
  //     title: page.title,
  //     text: page.description,
  //     url: page.url,
  //   });
  // }, [page.description, page.title, page.url]);

  // /**
  //  * Web share api が使えるかどうか(MobileかSafariだと使用可能)
  //  * @returns {boolean}
  //  */
  // const canShareByNavigator = useMemo(() => {
  //   return !!navigator?.share;
  // }, []);

  // return (
  //   <UncontrolledDropdown direction={direction}>
  //     <DropdownToggle tag="span">
  //       <div id={`manage-for-${page.id}`}>
  //         <IconButton width={18} height={18} icon="THREE_DOTS_VERTICAL" color="WHITE" activeColor="WHITE" />
  //       </div>
  //     </DropdownToggle>
  //     <DropdownMenu className="dropdown-menu-dark border-secondary" positionFixed container="body">
  //       {/* <CopyToClipboard text={page.url || ''} onCopy={() => toastSuccess(t.toastr_success_copy_url)}>
  //         <DropdownItem>
  //           <Icon icon="CLIP_BOARD_PLUS"  />
  //           <span className="ms-2">{t.copy_url}</span>
  //         </DropdownItem>
  //       </CopyToClipboard> */}
  //       <DropdownItem tag="button" onClick={() => handleModal({ name: 'deletePageModal', args: { targetPage: page } })}>
  //         <Icon icon="TRASH" />
  //         <span className="ms-2">{t.delete}</span>
  //       </DropdownItem>
  //       {page.archivedAt && (
  //         <DropdownItem tag="button" onClick={handleClickCancelArchiveButton}>
  //           <Icon height={20} width={20} icon="REPLY" />
  //           <span className="ms-2 text-nowrap">{t.return_button}</span>
  //         </DropdownItem>
  //       )}
  //       {/* TODO: implement */}
  //       {/* <DropdownItem tag="button" onClick={onClickFetchButton}>
  //         <Icon icon="ARROW_CLOCKWISE"  />
  //         <span className="ms-2">{t.fetch}</span>
  //       </DropdownItem> */}
  //       <DropdownItem tag="button" onClick={canShareByNavigator ? sharePageByNavigator : sharePage}>
  //         <Icon icon={canShareByNavigator ? 'SHARE' : 'TWITTER'} />
  //         <span className="ms-2">{t.share}</span>
  //       </DropdownItem>
  //     </DropdownMenu>
  //   </UncontrolledDropdown>
  // );
};
