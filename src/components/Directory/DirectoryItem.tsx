import { useState, VFC } from 'react';
import { Collapse } from 'reactstrap';

import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {};
export const DirectoryItem: VFC = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledDiv className="text-white text-left w-100 rounded" role="button" onClick={() => setIsOpen((prevState) => !prevState)}>
        {isOpen ? (
          <IconButton
            width={18}
            height={18}
            icon={BootstrapIcon.CARET_DOWN}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.SECONDARY}
            isRemovePadding
          />
        ) : (
          <IconButton
            width={18}
            height={18}
            icon={BootstrapIcon.CARET_RIGHT}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.SECONDARY}
            isRemovePadding
          />
        )}
        hoge
      </StyledDiv>
      <Collapse isOpen={isOpen}>{isOpen && <DirectoryItem />}</Collapse>
    </>
  );
};

const StyledDiv = styled.div`
  :hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }
`;
