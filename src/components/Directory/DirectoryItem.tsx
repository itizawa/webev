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

  const handleToggleCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const handleClickPencilIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <StyledDiv className="text-white text-left rounded d-flex" role="button" onClick={() => router.push(`/directory/${directory?._id}`)} isActive={isActive}>
        {isOpen ? (
          <IconButton
            width={18}
            height={18}
            isActive={isActive}
            icon={BootstrapIcon.CARET_DOWN}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.WHITE}
            onClickButton={handleToggleCollapse}
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
            onClickButton={handleToggleCollapse}
            isRemovePadding
          />
        )}
        <span className="text-truncate">{directory?.name}</span>
        <div className="ms-auto pencil-button">
          <IconButton
            width={18}
            height={18}
            isActive={isActive}
            icon={BootstrapIcon.ADD_TO_DIRECTORY}
            color={BootstrapColor.WHITE}
            activeColor={BootstrapColor.WHITE}
            onClickButton={handleClickPencilIcon}
            isRemovePadding
          />
        </div>
      </StyledDiv>
      <Collapse isOpen={isOpen}>
        <div className="ps-3">{isOpen && <DirectoryItem />}</div>
      </Collapse>
    </>
  );
};

const StyledDiv = styled.div<{ isActive?: boolean }>`
  .pencil-button {
    display: none;
  }

  &:hover {
    .pencil-button {
      display: block;
    }
  }
  ${({ isActive }) =>
    isActive
      ? `
    background-color: #6f42c1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;
