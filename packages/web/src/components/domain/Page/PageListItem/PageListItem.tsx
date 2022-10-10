import { VFC } from 'react';

import { Page } from '@webev/web/domains/Page';

// const MAX_WORD_COUNT_OF_BODY = 96;
// const MAX_WORD_COUNT_OF_SITE_NAME = 10;

type Props = {
  page: Page;
};

export const PageListItem: VFC<Props> = () => {
  // const { t } = useLocale();

  // const { isLoading: isLoadingSwitchArchive, switchArchive } = useSwitchArchive();

  return null;

  // const { id, url, siteName, image, favicon, title, description, updatedAt } = page;

  // const handleSwitchArchive = async () => {
  //   try {
  //     await switchArchive(_id, false);
  //     toastSuccess(t.toastr_success_put_back);
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // };

  // return (
  //   <StyledRow className="row py-2">
  //     <div className="col-3 col-md-2 p-1 p-md-2">
  //       {page.body ? (
  //         <Link href={`/page/${page.id}`}>
  //           <a>
  //             <FixedImage imageUrl={image} />
  //           </a>
  //         </Link>
  //       ) : (
  //         <a href={url} target="blank" rel="noopener noreferrer">
  //           <FixedImage imageUrl={image} />
  //         </a>
  //       )}
  //     </div>
  //     <div className="col-9 col-md-10">
  //       <div className="d-flex align-items-center">
  //         <p className="fw-bold text-break mb-0 me-auto">
  //           {page.body ? (
  //             <Link href={`/page/${page.id}`}>
  //               <a className="text-white webev-anchor webev-limit-2lines">{title || url}</a>
  //             </Link>
  //           ) : (
  //             <a className="text-white webev-anchor webev-limit-2lines" href={url} target="blank" rel="noopener noreferrer">
  //               {title || url}
  //             </a>
  //           )}
  //         </p>
  //         <PageManageDropdown page={page} />
  //       </div>
  //       <span className="small p-1 d-none d-sm-block">
  //         {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.slice(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
  //       </span>
  //     </div>
  //     <div className="col-12 d-flex align-items-center my-1">
  //       <small className="me-3 text-truncate">{format(new Date(updatedAt), 'yyyy/MM/dd')}</small>
  //       {favicon != null && (
  //         <img
  //           className="me-1"
  //           width={14}
  //           height={14}
  //           src={favicon}
  //           alt={favicon}
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           onError={(e: any) => (e.target.style.display = 'none')}
  //           loading="lazy"
  //           referrerPolicy="no-referrer"
  //           decoding="sync"
  //         />
  //       )}
  //       <small className="text-truncate">
  //         <Tooltip disabled={siteName?.length < MAX_WORD_COUNT_OF_SITE_NAME} text={siteName}>
  //           <a className="text-white webev-anchor" href={new URL(url).origin} target="blank" rel="noopener noreferrer">
  //             {siteName}
  //           </a>
  //         </Tooltip>
  //       </small>
  //       {!page.archivedAt && (
  //         <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={handleSwitchArchive} disabled={isLoadingSwitchArchive}>
  //           <Icon height={20} width={20} icon="CHECK" />
  //           <span className="ms-2 text-nowrap">{t.read_button}</span>
  //         </button>
  //       )}
  //     </div>
  //   </StyledRow>
  // );
};
