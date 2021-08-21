import { VFC, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import styled from 'styled-components';
import { format } from 'date-fns';
import CopyToClipboard from 'react-copy-to-clipboard';

import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Icon } from '~/components/base/atoms/Icon';
import { Tooltip } from '~/components/base/atoms/Tooltip';
import { IconButton } from '~/components/base/molecules/IconButton';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Page, PageStatus } from '~/domains/Page';

import { usePageListSWR } from '~/stores/page';
import { usePageForDelete, usePageForAddDirectory } from '~/stores/modal';
import { useAllDirectories } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';

const MAX_WORD_COUNT_OF_BODY = 96;
const MAX_WORD_COUNT_OF_SITE_NAME = 10;

type Props = {
  page: Page;
  isHideArchiveButton?: boolean;
};

export const PageListItem: VFC<Props> = ({ page, isHideArchiveButton }) => {
  const { t } = useLocale();

  const { mutate: mutatePageList } = usePageListSWR();
  const { _id, url, siteName, image, favicon, title, description, createdAt, status } = page;
  const [isArchive, setIsArchive] = useState(false);

  const { mutate: mutatePageForAddDirectory } = usePageForAddDirectory();
  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { data: allDirectories } = useAllDirectories();

  useEffect(() => {
    setIsArchive(page.status === PageStatus.PAGE_STATUS_ARCHIVE);
  }, [page]);

  const sharePage = async () => {
    if (window != null) {
      const twitterUrl = new URL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&hashtags=${siteName}`);
      window.open(twitterUrl.toString(), '_blank');
    }
  };

  const switchArchive = async () => {
    const bool = !isArchive;
    try {
      const { data: page } = await restClient.apiPut<Page>(`/pages/${_id}/archive`, { isArchive: !isArchive });
      if (bool) {
        toastSuccess(t.toastr_success_read);
      } else {
        toastSuccess(t.toastr_success_put_back);
      }
      setIsArchive(page.status === PageStatus.PAGE_STATUS_ARCHIVE);
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
  };

  const openAddDirectoryModal = async () => {
    mutatePageForAddDirectory(page);
  };

  const handleRemovePageButton = async () => {
    try {
      await restClient.apiPut(`/pages/${page?._id}/directories`, {
        directoryId: null,
      });
      toastSuccess(t.remove_page_from_directory);
      mutatePageList();
    } catch (error) {
      toastError(error);
    }
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
              <DropdownItem tag="button" onClick={openDeleteModal}>
                <Icon icon="TRASH" color="WHITE" />
                <span className="ms-2">{t.delete}</span>
              </DropdownItem>
              <DropdownItem tag="button" onClick={sharePage}>
                <Icon icon="TWITTER" color="WHITE" />
                <span className="ms-2">{t.share}</span>
              </DropdownItem>
              <DropdownItem tag="button" onClick={openAddDirectoryModal}>
                <Icon icon="ADD_TO_DIRECTORY" color="WHITE" />
                <span className="ms-2">{t.move_directory}</span>
              </DropdownItem>
              {!isHideArchiveButton && status === PageStatus.PAGE_STATUS_ARCHIVE && (
                <DropdownItem tag="button" onClick={switchArchive}>
                  <Icon height={20} width={20} icon="REPLY" color="WHITE" />
                  <span className="ms-2 text-nowrap">{t.return_button}</span>
                </DropdownItem>
              )}
              {page.directoryId != null && (
                <DropdownItem tag="button" onClick={handleRemovePageButton}>
                  <Icon icon="REMOVE_FROM_DIRECTORY" color="WHITE" />
                  <span className="ms-2">{t.remove_page_from_directory}</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
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
          <button className="btn btn-sm btn-primary d-flex ms-auto" onClick={switchArchive}>
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
