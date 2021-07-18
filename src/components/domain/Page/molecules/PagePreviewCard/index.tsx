import { VFC } from 'react';

import styled from 'styled-components';

import { imagePath } from '~/const/imagePath';

import { Page } from '~/domains/Page';

const MAX_WORD_COUNT_OF_BODY = 40;

type Props = {
  page: Page;
  onClickCard: () => void;
};

export const OgpPreviewCard: VFC<Props> = ({ page, onClickCard }) => {
  const { url, image, favicon, title, description } = page;

  return (
    <StyledDiv role="button" className="d-flex overflow-hidden" onClick={onClickCard}>
      <StyledImg
        height="100px"
        width="100px"
        src={image || imagePath.NO_IMAGE}
        alt={image || imagePath.NO_IMAGE}
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="sync"
      />
      <StyledDivRgiht className="px-3 py-2 d-flex flex-column">
        <p className="small fw-bold text-break mb-0 webev-limit-2lines">{title || url}</p>
        <StyledDescription className="small text-truncate mb-0">
          {description?.length > MAX_WORD_COUNT_OF_BODY ? description?.substr(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}
        </StyledDescription>
        <StyledUrl className="mb-0 align-items-middle text-truncate text-muted mt-auto">
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
          {new URL(url).hostname}
        </StyledUrl>
      </StyledDivRgiht>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: #333;
  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }
`;

const StyledImg = styled.img`
  object-fit: cover;
`;

const StyledDivRgiht = styled.div`
  width: calc(100% - 100px);
  height: 100px;
`;

const StyledDescription = styled.p`
  font-size: 0.75rem;
`;

const StyledUrl = styled.p`
  font-size: 0.75rem;
`;
