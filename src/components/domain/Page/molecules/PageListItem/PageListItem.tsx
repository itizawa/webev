import { VFC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { format } from 'date-fns';

import { PageManageDropdown } from '../PageManageDropdown';
import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Icon } from '~/components/base/atoms/Icon';
import { Tooltip } from '~/components/base/atoms/Tooltip';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Page } from '~/domains/Page';

import { useLocale } from '~/hooks/useLocale';
import { useSwitchArchive } from '~/hooks/Page/useSwitchArchive';
import { restClient } from '~/utils/rest-client';
import { usePagePagination } from '~/hooks/Page';

const MAX_WORD_COUNT_OF_BODY = 96;
const MAX_WORD_COUNT_OF_SITE_NAME = 10;

type Props = {
  page: Page;
};

export const PageListItem: VFC<Props> = ({ page }) => {
  const { t } = useLocale();

  const { isLoading: isLoadingSwitchArchive, switchArchive } = useSwitchArchive();
  const { pagePagination, mutatePagePagination } = usePagePagination();

  const { _id, url, siteName, image, favicon, title, description, createdAt, archivedAt } = page;

  const handleSwitchArchive = async () => {
    const bool = !archivedAt;
    try {
      await switchArchive(_id, bool);
      if (pagePagination) {
        mutatePagePagination(
          {
            ...pagePagination,
            docs: pagePagination.docs.filter((v) => v._id !== _id),
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

  const handleFetchButton = async () => {
    try {
      await restClient.apiPut(`/pages/${page._id}/ogp`);
      toastSuccess(t.toastr_success_fetch_page);
      mutatePagePagination();
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  };

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
          <PageManageDropdown page={page} onClickFetchButton={handleFetchButton} />
        </div>
        <span className="small p-1 d-none d-sm-block">
          {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.slice(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
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
        {!page.archivedAt && (
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
