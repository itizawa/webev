import { VFC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';

export const Diectory: VFC = () => {
  return (
    <>
      <h5 className="text-center">
        <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
        <Link href="/directory">
          <span className="ms-2 d-none d-lg-inline-block c-pointer">Directory</span>
        </Link>
      </h5>
      <StyledDiv className="text-center mx-3">
        <IconButton icon={BootstrapIcon.PLUS_DOTTED} color={BootstrapColor.LIGHT} activeColor={BootstrapColor.LIGHT} />
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  .btn {
    width: 100%;
    border-radius: 3px;
    :hover {
      background-color: rgba(200, 200, 200, 0.2);
      transition: all 300ms linear;
    }
  }
`;
