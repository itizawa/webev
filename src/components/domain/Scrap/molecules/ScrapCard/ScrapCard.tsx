import Link from 'next/link';
import { VFC } from 'react';

import styled from 'styled-components';
import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Scrap } from '~/domains/Scrap';

type Props = {
  scrap: Scrap;
};

export const ScrapCard: VFC<Props> = ({ scrap }) => {
  return (
    <StyledCard className="card border-0 shadow h-100 overflow-hidden">
      <Link href={`/scrap/${scrap._id}`}>
        <a>
          <FixedImage imageUrl={`/api/ogp?title=${scrap.title}`} />
        </a>
      </Link>
      {/* <div className="card-body p-2 d-flex flex-column">
        <p className="small mt-2 p-1">{description?.length > MAX_WORD_COUNT_OF_BODY ? description?.substr(0, MAX_WORD_COUNT_OF_BODY) + '...' : description}</p>
      </div> */}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: #2f363d;
`;
