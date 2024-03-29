import { FC } from 'react';
import styled from 'styled-components';

import { imagePath } from '@webev/web/libs/constants/imagePath';

type Props = {
  imageUrl?: string;
};

export const FixedImage: FC<Props> = ({ imageUrl }) => {
  return (
    <StyledImageWrapper>
      <img
        src={imageUrl || imagePath.NO_IMAGE}
        alt={imageUrl || imagePath.NO_IMAGE}
        className="overflow-auto"
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="sync"
      />
    </StyledImageWrapper>
  );
};

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52.5%;

  :hover {
    opacity: 0.8;
  }

  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
