import { VFC } from 'react';

import styled from 'styled-components';

import { imagePath } from '~/libs/constants/imagePath';
import { BootstrapBreakpoints } from '~/libs/interfaces/variables';

import { Page } from '~/domains/Page';

const MAX_WORD_COUNT_OF_BODY = 40;

type Props = {
  page: Page;
  onClickCard: () => void;
  onClickClearButton?: () => void;
};

export const PagePreviewCard: VFC<Props> = ({ page, onClickCard, onClickClearButton }) => {
  const { url, image, favicon, title, description } = page;

  const handleClickClearButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClickClearButton != null) {
      onClickClearButton();
    }
  };

  return (
    <StyledDiv role="button" className="d-flex" onClick={onClickCard}>
      <StyledImg
        height="100px"
        width="100px"
        src={image || imagePath.NO_IMAGE}
        alt={image || imagePath.NO_IMAGE}
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="sync"
      />
      <StyledDivRight className="px-3 py-2 d-flex flex-column position-relative">
        {!!onClickClearButton && (
          <StyledButton
            type="button"
            className="position-absolute top-0 end-0 btn btn-sm btn-danger btn-circle rounded-pill"
            onClick={handleClickClearButton}
          >
            ×
          </StyledButton>
        )}
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
      </StyledDivRight>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: #333;
  border-radius: 8px;

  button {
    @media (min-width: ${BootstrapBreakpoints.md}px) {
      display: none;
    }
  }

  :hover {
    opacity: 0.8;
    button {
      display: block;
    }
  }
`;

const StyledImg = styled.img`
  border-radius: 8px 0px 0px 8px;
  object-fit: cover;
`;

const StyledDivRight = styled.div`
  width: calc(100% - 100px);
  height: 100px;
`;

const StyledDescription = styled.p`
  font-size: 0.75rem;
`;

const StyledUrl = styled.p`
  font-size: 0.75rem;
`;

const StyledButton = styled.button`
  transform: translate(30%, -30%);
`;
