import { VFC, useMemo } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { format } from 'date-fns';

import { PageManageDropdown } from '../PageManageDropdown';
import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Icon } from '~/components/base/atoms/Icon';
import { Tooltip } from '~/components/base/atoms/Tooltip';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Page, PageStatus } from '~/domains/Page';

import { usePageForAddToDirectory, usePageForDelete } from '~/stores/modal';
import { useAllDirectories } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';
import { useSwitchArchive } from '~/hooks/Page/useSwitchArchive';
import { useRemovePageFromDirectory } from '~/hooks/Page/useRemovePageFromDirectory';
import { usePageListSWR } from '~/stores/page';

const MAX_WORD_COUNT_OF_BODY = 96;
const MAX_WORD_COUNT_OF_SITE_NAME = 10;

type Props = {
  page: Page;
  isHideArchiveButton?: boolean;
};

export const PageListItem: VFC<Props> = ({ page, isHideArchiveButton }) => {
  const { t } = useLocale();

  const { isLoading: isLoadingSwitchArchive, switchArchive } = useSwitchArchive();
  const { data: pageList, mutate: mutatePageList } = usePageListSWR();
  const { mutate: mutateUsePageForAddToDirectory } = usePageForAddToDirectory();
  const { removePageFromDirectory } = useRemovePageFromDirectory();

  const { _id, url, siteName, image, favicon, title, description, createdAt, status } = page;

  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { data: allDirectories } = useAllDirectories();

  const isArchive = useMemo(() => page.status === PageStatus.PAGE_STATUS_ARCHIVE, [page.status]);

  const handleSwitchArchive = async () => {
    const bool = !isArchive;
    try {
      await switchArchive(_id, bool);
      if (pageList) {
        mutatePageList(
          {
            ...pageList,
            docs: pageList.docs.filter((v) => v._id !== _id),
          },
          false,
        );
      }
      if (bool) {
        toastSuccess(t.toastr_success_read);
      } else {
        toastSuccess(t.toastr_success_put_back);
      }
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
  };

  const handleRemovePageButton = async () => {
    try {
      const data = await removePageFromDirectory(page?._id);
      if (pageList) {
        mutatePageList(
          {
            ...pageList,
            docs: [...pageList.docs.filter((v) => v._id !== page._id), data],
          },
          false,
        );
      }
      toastSuccess(t.remove_page_from_directory);
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  };

  const handleClickAddPageToDirectoryButton = () => {
    mutateUsePageForAddToDirectory(page);
  };

  const directoryOfPage = useMemo(() => {
    return allDirectories?.find((v) => v._id === page.directoryId);
  }, [allDirectories, page.directoryId]);

  return (
    <StyledRow className="row py-2">
      <div className="col-3 col-md-2 p-1 p-md-2">
        {page.body ? (
          <Link href={`/page/${page._id}`}>
            <a>
              <FixedImage imageUrl={image} />
            </a>
          </Link>
        ) : (
          <a href={url} target="blank" rel="noopener noreferrer">
            <FixedImage imageUrl={image} />
          </a>
        )}
      </div>
      <div className="col-9 col-md-10">
        <div className="d-flex align-items-center">
          <p className="fw-bold text-break mb-0 me-auto">
            {page.body ? (
              <Link href={`/page/${page._id}`}>
                <a className="text-white webev-anchor webev-limit-2lines">{title || url}</a>
              </Link>
            ) : (
              <a className="text-white webev-anchor webev-limit-2lines" href={url} target="blank" rel="noopener noreferrer">
                {title || url}
              </a>
            )}
          </p>
          <PageManageDropdown
            page={page}
            onClickDeleteButton={openDeleteModal}
            onClickSwitchArchiveButton={handleSwitchArchive}
            onClickRemovePageButton={handleRemovePageButton}
            onClickAddPageToDirectoryButton={handleClickAddPageToDirectoryButton}
          />
        </div>
        {directoryOfPage != null && (
          <div className="">
            <Tooltip disabled={directoryOfPage.description.trim() === ''} text={directoryOfPage.description}>
              <Link href={`/directory/${directoryOfPage._id}`}>
                <span role="button" className="badge bg-secondary text-white" id={`directory-for-${page._id}`}>
                  <Icon height={14} width={14} icon="DIRECTORY" color="WHITE" />
                  <span className="ms-1">{directoryOfPage.name}</span>
                </span>
              </Link>
            </Tooltip>
          </div>
        )}
        <span className="small p-1 d-none d-sm-block">
          {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.substr(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
        </span>
      </div>
      <div className="col-12 d-flex align-items-center my-1">
        <small className="me-3 text-truncate">{format(new Date(createdAt), 'yyyy/MM/dd')}</small>
        {favicon != null && (
          <img
            className="me-1"
            width={14}
            height={14}
            src={favicon}
            alt={favicon}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError={(e: any) => (e.target.style.display = 'none')}
            loading="lazy"
            referrerPolicy="no-referrer"
            decoding="sync"
          />
        )}
        <small className="text-truncate">
          <Tooltip disabled={siteName?.length < MAX_WORD_COUNT_OF_SITE_NAME} text={siteName}>
            <a className="text-white webev-anchor" href={new URL(url).origin} target="blank" rel="noopener noreferrer">
              {siteName}
            </a>
          </Tooltip>
        </small>
        {!isHideArchiveButton && status === PageStatus.PAGE_STATUS_STOCK && (
          <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={handleSwitchArchive} disabled={isLoadingSwitchArchive}>
            <Icon height={20} width={20} icon="CHECK" color="WHITE" />
            <span className="ms-2 text-nowrap">{t.read_button}</span>
          </button>
        )}
      </div>
    </StyledRow>
  );
};

const StyledRow = styled.div`
  border-top: 1px solid #404040;
`;
