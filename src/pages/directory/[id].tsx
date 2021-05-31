import { Fragment, useEffect, useState, VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { useLocale } from '~/hooks/useLocale';

import { useAncestorDirectories, useDirectoryChildren, useDirectoryInfomation } from '~/stores/directory';
import { useDirectoryId, usePageListSWR } from '~/stores/page';
import { useDirectoryForDelete, useParentDirectoryForCreateDirectory, useDirectoryForRename, useDirectoryForSavePage } from '~/stores/modal';
import { useUrlFromClipBoard } from '~/stores/contexts';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { IconButton } from '~/components/Icons/IconButton';
import { Icon } from '~/components/Icons/Icon';
import { PageList } from '~/components/Page/PageList';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { Directory } from '~/domains/Directory';
import { DirectoryListItem } from '~/components/Directory/DirectoryListItem';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

const Index: VFC = () => {
  const { t } = useLocale();

  const router = useRouter();
  const { id } = router.query;

  const { mutate: mutateDirectoryId } = useDirectoryId();
  const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();

  const { data: urlFromClipBoard } = useUrlFromClipBoard();
  const { mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();

  mutateDirectoryId(id as string);
  const { data: directory } = useDirectoryInfomation(id as string);
  const { data: ancestorDirectories } = useAncestorDirectories(id as string);
  const { data: paginationResult } = usePageListSWR();
  const { data: childrenDirectoryTrees } = useDirectoryChildren(directory?._id);

  const [description, setDescription] = useState<string>();
  const [descriptionRows, setDescriptionRows] = useState<number>();

  useEffect(() => {
    if (directory != null) {
      setDescription(directory.description);
    }
  }, [directory]);

  useEffect(() => {
    if (description != null) {
      setDescriptionRows(description.split('\n').length);
    }
  }, [description]);

  const openDeleteModal = (directory: Directory) => {
    mutateDirectoryForDelete(directory);
  };

  const openRenameModal = (directory: Directory) => {
    mutateDirectoryForRename(directory);
  };

  const openAddDirectoryModal = (directory: Directory) => {
    mutateParentDirectoryForCreateDirectory(directory);
  };

  const handleChangeDescription = (inputValue: string) => {
    setDescription(inputValue);
  };

  const handleBlurTextArea = async (): Promise<void> => {
    // do nothing, no change
    if (description === directory?.description) {
      return;
    }
    try {
      await restClient.apiPut(`/directories/${directory?._id}/description`, { description });
      toastSuccess(t.toastr_update_directory_description);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        {directory != null && (
          <>
            <div className="text-nowrap overflow-scroll small pb-2 pb-md-0">
              <Link href="/directory">
                <a className="text-decoration-none text-white">{t.directory}</a>
              </Link>
              <span className="mx-1">{'/'}</span>
              {ancestorDirectories?.map((ancestorDirectorie) => {
                const ancestorDirectory = ancestorDirectorie.ancestor as Directory;
                if (ancestorDirectory._id === directory._id) {
                  return null;
                }
                return (
                  <Fragment key={ancestorDirectorie._id}>
                    <Link href={`/directory/${ancestorDirectory._id}`}>
                      <a className="text-decoration-none text-white">{ancestorDirectory.name}</a>
                    </Link>
                    <span className="mx-1">{'/'}</span>
                  </Fragment>
                );
              })}
            </div>
            <div className="d-flex gap-3 align-items-center">
              <span className="text-nowrap overflow-scroll fs-1 pb-2 pb-md-0 me-auto">{directory?.name}</span>
              <IconButton
                width={18}
                height={18}
                icon={BootstrapIcon.SAVE}
                color={BootstrapColor.SECONDARY}
                activeColor={BootstrapColor.WARNING}
                isActive={urlFromClipBoard != null}
                onClickButton={() => mutateDirectoryForSavePage(directory)}
              />
              <UncontrolledDropdown direction="down">
                <DropdownToggle tag="div">
                  <IconButton
                    width={18}
                    height={18}
                    icon={BootstrapIcon.THREE_DOTS_HORIZONAL}
                    color={BootstrapColor.SECONDARY}
                    activeColor={BootstrapColor.WARNING}
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-dark" positionFixed right>
                  <DropdownItem tag="button" onClick={() => openDeleteModal(directory)}>
                    <Icon icon={BootstrapIcon.TRASH} color={BootstrapColor.WHITE} />
                    <span className="ms-2">{t.delete}</span>
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={() => openRenameModal(directory)}>
                    <Icon icon={BootstrapIcon.PENCIL} color={BootstrapColor.WHITE} />
                    <span className="ms-2">{t.rename_directory}</span>
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={() => openAddDirectoryModal(directory)}>
                    <Icon icon={BootstrapIcon.ADD_TO_DIRECTORY} color={BootstrapColor.WHITE} />
                    <span className="ms-2">{t.create_directory}</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </>
        )}
        <StyledTextarea
          className="form-control w-100"
          value={description}
          rows={descriptionRows}
          onChange={(e) => handleChangeDescription(e.target.value)}
          onBlur={handleBlurTextArea}
          placeholder={t.no_description}
        />
        {childrenDirectoryTrees != null && childrenDirectoryTrees.length > 0 && (
          <div className="my-3 bg-dark shadow p-3">
            <h5>{t.child_directory}</h5>
            <div className="row">
              {childrenDirectoryTrees.map((v) => {
                const directory = v.descendant as Directory;
                return (
                  <div className="col-xl-4 col-md-6 col-12" key={directory._id}>
                    <DirectoryListItem directory={directory} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="my-2 d-flex">
          <div className="ms-auto">
            <SortButtonGroup />
          </div>
        </div>
        {paginationResult == null && (
          <div className="text-center pt-5">
            <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {paginationResult != null && <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />}
      </div>
    </LoginRequiredWrapper>
  );
};

export default Index;

const StyledTextarea = styled.textarea`
  color: #ccc;
  resize: none;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
