import Link from 'next/link';
import { VFC, useState, MouseEvent } from 'react';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import styled from 'styled-components';

import { Emoji } from 'emoji-mart';
import { Directory } from '~/domains/Directory';
import { BootstrapBreakpoints } from '~/interfaces/variables';

import { useDirectoryForDelete, useParentDirectoryForCreateDirectory, useDirectoryForRename } from '~/stores/modal';

import { IconButton } from '~/components/base/molecules/IconButton';
import { Icon } from '~/components/base/atoms/Icon';

type Props = {
  directory: Directory;
};
export const DirectoryListItem: VFC<Props> = ({ directory }) => {
  const [directoryIdForDropdown, setDirectoryIdForDropdown] = useState('');

  const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();

  const openDeleteModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, directory: Directory) => {
    e.stopPropagation();
    mutateDirectoryForDelete(directory);
  };

  const openRenameModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, directory: Directory) => {
    e.stopPropagation();
    mutateDirectoryForRename(directory);
  };

  const openAddDirectoryModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, directory: Directory) => {
    e.stopPropagation();
    mutateParentDirectoryForCreateDirectory(directory);
  };

  const handleClickManageButton = (e: MouseEvent<HTMLButtonElement>, directoryId: string) => {
    e.stopPropagation();
    setDirectoryIdForDropdown((prevDirectoryId) => (prevDirectoryId === directoryId ? '' : directoryId));
  };

  return (
    <Link href={`/directory/${directory._id}`}>
      <StyledList className="d-flex" role="button">
        <div className="w-100 text-truncate">
          <StyledEmojiWrapper>
            <Emoji emoji={directory.emojiId} size={20} />
          </StyledEmojiWrapper>
          <span className="ms-3" role="button">
            {directory.name}
          </span>
        </div>
        <Dropdown isOpen={directoryIdForDropdown === directory._id} toggle={() => setDirectoryIdForDropdown('')}>
          <DropdownToggle tag="span" className="manage-directory-button">
            <IconButton
              width={18}
              height={18}
              icon="THREE_DOTS_VERTICAL"
              color="WHITE"
              activeColor="WHITE"
              onClickButton={(e) => handleClickManageButton(e, directory._id)}
              isRemovePadding
            />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-dark" positionFixed right>
            <DropdownItem tag="button" onClick={(e) => openDeleteModal(e, directory)}>
              <Icon icon="TRASH" color="WHITE" />
              <span className="ms-2">Trash</span>
            </DropdownItem>
            <DropdownItem tag="button" onClick={(e) => openRenameModal(e, directory)}>
              <Icon icon="PENCIL" color="WHITE" />
              <span className="ms-2">Rename</span>
            </DropdownItem>
            <DropdownItem tag="button" onClick={(e) => openAddDirectoryModal(e, directory)}>
              <Icon icon="ADD_TO_DIRECTORY" color="WHITE" />
              <span className="ms-2">Create Directory</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </StyledList>
    </Link>
  );
};

const StyledEmojiWrapper = styled.span`
  .emoji-mart-emoji {
    vertical-align: text-bottom;
  }
`;

const StyledList = styled.li<{ isActive?: boolean }>`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  .manage-directory-button {
    height: 24px;
    @media (min-width: ${BootstrapBreakpoints.md}px) {
      display: none;
    }
  }

  &:hover {
    .manage-directory-button {
      display: block;
    }
  }

  ${({ isActive }) =>
    isActive
      ? `
    margin-top: 0px;
    background-color: #00acc1;
    box-shadow: 0 12px 20px -10px rgba(0, 172, 193, 0.28), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 172, 193, 0.2);
  `
      : `:hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }`}
`;
