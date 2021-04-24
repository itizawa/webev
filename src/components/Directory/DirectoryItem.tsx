import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = router.query.id != null && directory?._id === router.query.id;

  return (
    <>
      <StyledDiv
        className="text-white text-left w-100 rounded text-truncate"
        role="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
        isActive={isActive}
      >
        {isOpen ? (
          <IconButton
            width={18}
            height={18}
            isActive={isActive}
            icon={BootstrapIcon.CARET_DOWN}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.WHITE}
            isRemovePadding
          />
        ) : (
          <IconButton
            width={18}
            height={18}
            isActive={isActive}
            icon={BootstrapIcon.CARET_RIGHT}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.WHITE}
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

const StyledDiv = styled.div<{ isActive?: boolean }>`
  ${({ isActive }) =>
    isActive
      ? `
    background-color: #00acc1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
  background-color: rgba(200, 200, 200, 0.2);
  transition: all 300ms linear;
  }`}
`;
