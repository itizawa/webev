import { VFC } from 'react';
import styled from 'styled-components';

import { imagePath } from '~/const/imagePath';

type Props = {
  imageUrl?: string;
};
export const FixedImage: VFC<Props> = ({ imageUrl }) => {
  return (
    <StyledImageWrapper>
      <img src={imageUrl || imagePath.NO_IMAGE} alt={imageUrl || imagePath.NO_IMAGE} loading="lazy" referrerPolicy="no-referrer" decoding="sync" />
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
    width: 100%;
    height: 100%;
  }
`;
