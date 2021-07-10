import { VFC, useMemo } from 'react';
import Link from 'next/link';

import { UncontrolledTooltip } from 'reactstrap';

import styled from 'styled-components';
import { format } from 'date-fns';

import { FixedImage } from '~/components/Atoms/FixedImage';
import { Icon } from '~/components/Icons/Icon';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { Page } from '~/domains/Page';

import { useAllDirectories } from '~/stores/directory';

const MAX_WORD_COUNT_OF_BODY = 96;
const MAX_WORD_COUNT_OF_SITENAME = 10;

type Props = {
  page: Page;
};

export const OgpPreviewCard: VFC<Props> = ({ page }) => {
  const { url, siteName, image, favicon, title, description, createdAt } = page;

  const { data: allDirectories } = useAllDirectories();

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
        <small className="me-3 text-truncate" id={`sitename-for-${page._id}`}>
          {format(new Date(createdAt), 'yyyy/MM/dd')}
        </small>
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
          <a className="text-white webev-anchor" href={new URL(url).origin} target="blank" rel="noopener noreferrer">
            {siteName}
          </a>
          {siteName?.length > MAX_WORD_COUNT_OF_SITENAME && (
            <UncontrolledTooltip placement="top" target={`sitename-for-${page._id}`}>
              {siteName}
            </UncontrolledTooltip>
          )}
        </small>
      </div>
    </StyledRow>
  );
};

const StyledRow = styled.div`
  border-top: 1px solid #404040;
`;
