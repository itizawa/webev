import Link from 'next/link';
import { useState, VFC } from 'react';
import { Collapse } from 'reactstrap';

import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { Directory } from '~/interfaces/directory';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {
  directory?: Directory;
};

export const DirectoryItem: VFC<Props> = ({ directory }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledDiv className="text-white text-left w-100 rounded text-truncate" role="button" onClick={() => setIsOpen((prevState) => !prevState)}>
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
        <Link href={`/directory/${directory?._id}`}>
          <a className="text-decoration-none text-white">{directory?.name}</a>
        </Link>
      </StyledDiv>
      <Collapse isOpen={isOpen}>
        <div className="ps-3">{isOpen && <DirectoryItem />}</div>
      </Collapse>
    </>
  );
};

const StyledDiv = styled.div`
  :hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }
`;
