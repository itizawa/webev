import { VFC, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import styled from 'styled-components';
import { format } from 'date-fns';

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

type Props = {
  page: Page;
  isHideArchiveButton?: boolean;
};

export const PageCard: VFC<Props> = ({ page, isHideArchiveButton }) => {
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
      const { data: page } = await restClient.apiPut<Page>(`/pages/${_id}/archive`, { isArchive: bool });
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
    <StyledCard className="card border-0 shadow h-100 overflow-hidden">
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
      <div className="card-body p-2 d-flex flex-column">
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
          <div className="mt-2">
            <Tooltip text={directoryOfPage.description} disabled={directoryOfPage.description.trim() === ''}>
              <Link href={`/directory/${directoryOfPage._id}`}>
                <span role="button" className="badge bg-secondary text-white">
                  <Icon height={14} width={14} icon="DIRECTORY" color="WHITE" />
                  <span className="ms-1">{directoryOfPage.name}</span>
                </span>
              </Link>
            </Tooltip>
          </div>
        )}
        <p className="small mt-2 p-1">{description?.length > MAX_WORD_COUNT_OF_BODY ? description?.substr(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}</p>
        <div className="d-flex align-items-center mt-auto justify-content-between">
          <small className="text-truncate me-auto">
            {favicon != null && (
              <img
                className="me-1"
                width={14}
                height={14}
                src={favicon || ''}
                alt={favicon || ''}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError={(e: any) => (e.target.style.display = 'none')}
                loading="lazy"
                referrerPolicy="no-referrer"
                decoding="sync"
              />
            )}
            <a className="text-white webev-anchor" href={new URL(url).origin} target="blank" rel="noopener noreferrer">
              {siteName}
            </a>
            {siteName != null && <br />}
            {format(new Date(createdAt), 'yyyy/MM/dd')}
          </small>
          {!isHideArchiveButton && status === PageStatus.PAGE_STATUS_STOCK && (
            <button className="btn btn-sm btn-primary d-flex" onClick={switchArchive}>
              <Icon height={20} width={20} icon="CHECK" color="WHITE" />
              <span className="ms-2 text-nowrap">{t.read_button}</span>
            </button>
          )}
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: #2f363d;
`;
