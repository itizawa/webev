import { VFC, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

import { UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import urljoin from 'url-join';
import styled from 'styled-components';
import { format } from 'date-fns';

import { FixedImage } from '~/components/Atoms/FixedImage';
import { Icon } from '~/components/Icons/Icon';
import { IconButton } from '~/components/Icons/IconButton';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { Page, PageStatus } from '~/domains/Page';

import { usePageListSWR } from '~/stores/page';
import { usePageForDelete, usePageForAddDirectory } from '~/stores/modal';
import { useAllDirectories } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';

const MAX_WORD_COUNT_OF_BODY = 96;
const MAX_WORD_COUNT_OF_SITENAME = 10;

type Props = {
  page: Page;
};

export const OgpListItem: VFC<Props> = ({ page }: Props) => {
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
      const twitterUrl = urljoin('https://twitter.com/intent/tweet', `?url=${encodeURIComponent(url)}`, `&hashtags=${siteName}`);
      window.open(twitterUrl, '_blanck');
    }
  };

  const switchArchive = async () => {
    const bool = !isArchive;
    try {
      const { data: page } = await restClient.apiPut(`/pages/${_id}/archive`, { isArchive: !isArchive });
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

  const directoryOfPage = useMemo(() => {
    return allDirectories?.find((v) => v._id === page.directoryId);
  }, [allDirectories, page.directoryId]);

  return (
    <StyledRow className="row py-2">
      <div className="col-3 col-md-2 p-1 p-md-2">
        <a href={url} target="blank" rel="noopener noreferrer">
          <FixedImage imageUrl={image} />
        </a>
      </div>
      <div className="col-9 col-md-10">
        <div className="d-flex align-items-center">
          <p className="fw-bold text-break mb-0 me-auto">
            <a className="text-white webev-anchor" href={url} target="blank" rel="noopener noreferrer">
              {title || url}
            </a>
          </p>
          <UncontrolledDropdown direction="left">
            <DropdownToggle tag="span">
              <div id={`manage-for-${page._id}`}>
                <IconButton width={18} height={18} icon={BootstrapIcon.THREE_DOTS_VERTICAL} color={BootstrapColor.WHITE} activeColor={BootstrapColor.WHITE} />
              </div>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-dark" positionFixed>
              <DropdownItem tag="button" onClick={openDeleteModal}>
                <Icon icon={BootstrapIcon.TRASH} color={BootstrapColor.WHITE} />
                <span className="ms-2">{t.delete}</span>
              </DropdownItem>
              <DropdownItem tag="button" onClick={sharePage}>
                <Icon icon={BootstrapIcon.TWITTER} color={BootstrapColor.WHITE} />
                <span className="ms-2">{t.share}</span>
              </DropdownItem>
              <DropdownItem tag="button" onClick={openAddDirectoryModal}>
                <Icon icon={BootstrapIcon.ADD_TO_DIRECTORY} color={BootstrapColor.WHITE} />
                <span className="ms-2">{t.move_directory}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        {directoryOfPage != null && (
          <div className="">
            <Link href={`/directory/${directoryOfPage._id}`}>
              <span role="button" className="badge bg-secondary text-white" id={`directory-for-${page._id}`}>
                <Icon height={14} width={14} icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.WHITE} />
                <span className="ms-1">{directoryOfPage.name}</span>
              </span>
            </Link>
            {directoryOfPage.description.trim() !== '' && (
              <UncontrolledTooltip placement="top" target={`directory-for-${page._id}`} fade={false}>
                {directoryOfPage.description}
              </UncontrolledTooltip>
            )}
          </div>
        )}
        <span className="small p-1 d-none d-sm-block">
          {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.substr(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
        </span>
      </div>
      <div className="col-12 d-flex align-items-center my-1">
        <small className="text-truncate" id={`sitename-for-${page._id}`}>
          {t.stoked_at}: {format(new Date(createdAt), 'yyyy/MM/dd HH:MM')}
        </small>
        {favicon != null && (
          <img className="ms-3 me-1" width={14} height={14} src={favicon} alt={favicon} loading="lazy" referrerPolicy="no-referrer" decoding="sync" />
        )}
        <small className="text-truncate">
          <a className="text-white webev-anchor" href={new URL(url).origin} target="blank" rel="noopener noreferrer">
            {siteName}
          </a>
          {siteName?.length > MAX_WORD_COUNT_OF_SITENAME && (
            <UncontrolledTooltip placement="top" target={`sitename-for-${page._id}`}>
              {siteName}
            </UncontrolledTooltip>
          )}
        </small>
        <StyledButton className="btn btn-sm d-flex ms-auto" onClick={switchArchive}>
          {status === PageStatus.PAGE_STATUS_ARCHIVE && (
            <>
              <Icon height={20} width={20} icon={BootstrapIcon.REPLY} color={BootstrapColor.WHITE} />
              <span className="ms-2 text-nowrap">{t.return_button}</span>
            </>
          )}
          {status === PageStatus.PAGE_STATUS_STOCK && (
            <>
              <Icon height={20} width={20} icon={BootstrapIcon.CHECK} color={BootstrapColor.WHITE} />
              <span className="ms-2 text-nowrap">{t.read_button}</span>
            </>
          )}
        </StyledButton>
      </div>
    </StyledRow>
  );
};

const StyledRow = styled.div`
  border-top: 1px solid #404040;
`;

const StyledButton = styled.button`
  color: #fff;
  background-color: #008078;

  :hover {
    color: #fff;
    opacity: 0.8;
  }
`;
