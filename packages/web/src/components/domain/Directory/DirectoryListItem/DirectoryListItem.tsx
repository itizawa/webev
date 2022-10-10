import Link from 'next/link';
import { VFC } from 'react';

import styled from 'styled-components';

import { Directory } from '~/domains/Directory';
import { BootstrapBreakpoints } from '~/libs/interfaces/variables';

type Props = {
  directory: Directory;
};
export const DirectoryListItem: VFC<Props> = ({ directory }) => {
  // const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  // const { mutate: mutateDirectoryForRename } = useDirectoryForRename();
  // const { mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();

  // const openDeleteModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
  //   e.stopPropagation();
  //   // mutateDirectoryForDelete(directory);
  // };

  // const openRenameModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
  //   e.stopPropagation();
  //   // mutateDirectoryForRename(directory);
  // };

  // const openAddDirectoryModal = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
  //   e.stopPropagation();
  //   // mutateParentDirectoryForCreateDirectory(directory);
  // };

  return (
    <Link href={`/directory/${directory._id}`}>
      <StyledList className="d-flex" role="button">
        <div className="w-100 text-truncate">
          <span className="ms-3" role="button">
            {directory.name}
          </span>
        </div>
        {/* <Dropdown isOpen={directoryIdForDropdown === directory._id} toggle={() => setDirectoryIdForDropdown('')}>
          <DropdownToggle tag="span" className="manage-directory-button"></DropdownToggle>
          <DropdownMenu className="dropdown-menu-dark" positionFixed end>
            <DropdownItem tag="button" onClick={(e) => openDeleteModal(e, directory)}>
              <Icon icon="TRASH" color="WHITE" />
              <span className="ms-2">{t.delete}</span>
            </DropdownItem>
            <DropdownItem tag="button" onClick={(e) => openRenameModal(e, directory)}>
              <Icon icon="PENCIL" color="WHITE" />
              <span className="ms-2">{t.rename_directory}</span>
            </DropdownItem>
            <DropdownItem tag="button" onClick={(e) => openAddDirectoryModal(e, directory)}>
              <Icon icon="ADD_TO_DIRECTORY" color="WHITE" />
              <span className="ms-2">{t.create_directory}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </StyledList>
    </Link>
  );
};

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
