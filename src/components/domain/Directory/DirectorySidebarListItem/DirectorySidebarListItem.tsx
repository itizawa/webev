import { useState, VFC } from 'react';

import styled from 'styled-components';

import { useRouter } from 'next/router';
import { BootstrapBreakpoints } from '~/libs/interfaces/variables';

import { Directory } from '~/domains/Directory';

type Props = {
  directory: Directory;
};

export const DirectorySidebarListItem: VFC<Props> = ({ directory }) => {
  const router = useRouter();
  const isActive = directory._id === router.query.id;

  const [isHoverDirectoryItem, setIsHoverDirectoryItem] = useState(false);

  // const handleSubmitCreateDirectory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();

  //   if (name.trim() === '') {
  //     return setIsCreatingNewDirectory(false);
  //   }

  //   try {
  //     await restClient.apiPost<Directory>('/directories', { name, parentDirectoryId: directory?._id });
  //     toastSuccess(t.toastr_save_directory);
  //     setName('');
  //     setIsCreatingNewDirectory(false);
  //     mutateChildrenDirectoriesForDisplay();
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // };

  return (
    <>
      <StyledDiv
        className="text-white text-left rounded d-flex"
        onClick={() => router.push(`/directory/${directory._id}`)}
        isActive={isActive}
        onMouseEnter={() => setIsHoverDirectoryItem(true)}
        onMouseLeave={() => setIsHoverDirectoryItem(false)}
      >
        <div className="text-truncate">
          {isHoverDirectoryItem && <></>}
          <span className="ms-2">{directory?.name}</span>
        </div>
        <div className="ms-auto create-directory-button" id={`create-directory-icon-on-${directory?._id}`}></div>
        {/* <UncontrolledTooltip fade={false} placement="top" target={`create-directory-icon-on-${directory?._id}`}>
          {t.create_directory}
        </UncontrolledTooltip> */}
      </StyledDiv>
      {/* <Collapse isOpen={isOpen}>
        <div className="ps-3 pt-1">
          {isCreatingNewDirectory && (
            <form className="input-group my-2 ps-3" onSubmit={handleSubmitCreateDirectory}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control bg-white"
                placeholder="...name"
                autoFocus
              />
            </form>
          )}
          {childrenDirectoryTrees && (
            <>
              {childrenDirectoryTrees.map((childrenDirectoryTree) => {
                const childDirectory = childrenDirectoryTree.descendant as Directory;
                return <DirectorySidebarListItem key={childrenDirectoryTree._id} directory={childDirectory} />;
              })}
              {childrenDirectoryTrees.length === 0 && <div className="ps-3 my-1">No Directory</div>}
            </>
          )}
        </div>
      </Collapse> */}
    </>
  );
};

const StyledDiv = styled.div<{ isActive?: boolean }>`
  align-items: center;
  /* ズレをなくすための調整 */
  height: 24px;

  .create-directory-button {
    @media (min-width: ${BootstrapBreakpoints.md}px) {
      display: none;
    }
  }

  &:hover {
    .create-directory-button {
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
