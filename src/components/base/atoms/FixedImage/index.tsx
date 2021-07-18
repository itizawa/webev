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
  padding-top: 55%;

  :hover {
    opacity: 0.8;
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background-image: url('/spinner.gif');
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
