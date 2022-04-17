import { VFC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { format } from 'date-fns';

import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Icon } from '~/components/base/atoms/Icon';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Page } from '~/domains/Page';

import { useLocale } from '~/hooks/useLocale';
import { useSwitchArchive } from '~/hooks/Page/useSwitchArchive';
import { PageManageDropdown } from '../PageManageDropdown';

const MAX_WORD_COUNT_OF_BODY = 96;

type Props = {
  page: Page;
};

export const PageCard: VFC<Props> = ({ page }) => {
  const { t } = useLocale();

  const { isLoading: isLoadingSwitchArchive, switchArchive } = useSwitchArchive();

  const { _id, url, siteName, image, favicon, title, description, updatedAt } = page;

  const handleSwitchArchive = async () => {
    try {
      await switchArchive(_id, true);
      toastSuccess(t.toastr_success_read);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

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
          <PageManageDropdown page={page} />
        </div>
        <p className="small mt-2 p-1">
          {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.slice(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
        </p>
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
            {format(new Date(updatedAt), 'yyyy/MM/dd')}
          </small>
          {!page.archivedAt && (
            <button className="btn btn-sm btn-primary d-flex" onClick={handleSwitchArchive} disabled={isLoadingSwitchArchive}>
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
