import { Fragment, useEffect, useState, VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

import { useAncestorDirectories, useDirectoryChildren, useDirectoryInfomation, useDirectoryListSWR } from '~/stores/directory';
import { useDirectoryId, useIsRetrieveFavoritePageList, usePageListSWR } from '~/stores/page';
import { useDirectoryForDelete, useIsOpenDeleteDirectoryModal } from '~/stores/modal';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { OgpCard } from '~/components/organisms/OgpCard';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { IconButton } from '~/components/Icons/IconButton';
import { Icon } from '~/components/Icons/Icon';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { Directory } from '~/domains/Directory';

const Index: VFC = () => {
  const { t } = useLocale();

  const router = useRouter();
  const { id } = router.query;

  const { mutate: mutateDirectoryId } = useDirectoryId();
  const { mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateIsOpenDeleteDirectoryModal } = useIsOpenDeleteDirectoryModal();

  const { data: isRetrieveFavoritePageList, mutate: mutateIsRetrieveFavoritePageList } = useIsRetrieveFavoritePageList();

  const [isEditing, setIsEditing] = useState(false);
  const [newDirecroryName, setNewDirecroryName] = useState('');

  mutateDirectoryId(id as string);
  const { data: directory, mutate: mutateDirectory } = useDirectoryInfomation(id as string);
  const { data: ancestorDirectories } = useAncestorDirectories(id as string);
  const { mutate: mutateDirectoryList } = useDirectoryListSWR();
  const { data: paginationResult } = usePageListSWR();
  const { data: childrenDirectoryTrees } = useDirectoryChildren(directory?._id);

  useEffect(() => {
    if (directory != null) {
      setNewDirecroryName(directory?.name);
    }
  }, [directory]);

  const openDeleteModal = () => {
    mutateDirectoryForDelete(directory);
    mutateIsOpenDeleteDirectoryModal(true);
  };

  const handleSubmitRenameForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If there is no change, do nothing
    if (newDirecroryName === directory?.name) {
      return setIsEditing(false);
    }

    try {
      await restClient.apiPut(`/directories/${directory?._id}/rename`, { name: newDirecroryName });
      toastSuccess(t.toastr_update_directory_name);
      mutateDirectory();
      mutateDirectoryList();
      setIsEditing(false);
    } catch (error) {
      toastError(error);
    }
  };
  console.log(childrenDirectoryTrees);

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        {directory != null && (
          <>
            <small>
              <Link href="/directory">
                <a className="text-decoration-none text-white">Directory</a>
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
            </small>
            <div className="d-flex gap-3 align-items-center">
              {isEditing ? (
                <form className="input-group my-2" onSubmit={handleSubmitRenameForm}>
                  <input
                    type="text"
                    value={newDirecroryName}
                    className="form-control ps-3 bg-white"
                    onChange={(e) => setNewDirecroryName(e.target.value)}
                    autoFocus
                  />
                  <button className="btn btn-secondary" type="submit" id="input-group" disabled={newDirecroryName.trim() === ''}>
                    {t.save}
                  </button>
                </form>
              ) : (
                <span className="text-nowrap overflow-scroll fs-1">{directory?.name}</span>
              )}
              <div className="ms-auto">
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
                    <DropdownItem tag="button" onClick={openDeleteModal}>
                      <Icon icon={BootstrapIcon.TRASH} color={BootstrapColor.WHITE} />
                      <span className="ms-2">Trash</span>
                    </DropdownItem>
                    <DropdownItem tag="button" onClick={() => setIsEditing(true)}>
                      <Icon icon={BootstrapIcon.PENCIL} color={BootstrapColor.WHITE} />
                      <span className="ms-2">Rename</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </>
        )}
        {childrenDirectoryTrees != null && childrenDirectoryTrees.length > 0 && (
          <div className="my-3 bg-dark shadow  p-3">
            <h5>Child Directories</h5>
            <div className="row">
              {childrenDirectoryTrees.map((v) => {
                const directory = v.descendant as Directory;
                return (
                  <div className="col-xl-4 col-md-6" key={directory._id}>
                    <Link href={`/directory/${directory._id}`}>
                      <StyledList className="list-group-item border-0 d-flex">
                        <div>
                          <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
                          <span className="ms-3" role="button">
                            {directory.name}
                          </span>
                        </div>
                      </StyledList>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="my-2 d-flex">
          <div className="ms-auto me-3">
            <IconButton
              icon={BootstrapIcon.STAR}
              isActive={isRetrieveFavoritePageList}
              color={BootstrapColor.SECONDARY}
              activeColor={BootstrapColor.WARNING}
              onClickButton={() => mutateIsRetrieveFavoritePageList(!isRetrieveFavoritePageList)}
              buttonSize="sm"
              text={t.only_favorite}
            />
          </div>
          <SortButtonGroup />
        </div>
        {paginationResult != null && (
          <div className="row">
            {paginationResult.docs.map((page) => (
              <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                <OgpCard page={page} />
              </div>
            ))}
            {paginationResult.docs.length === 0 ? (
              <div className="col-12">
                <NoPageAlert />
              </div>
            ) : (
              <div className="text-center">
                <PaginationWrapper pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
              </div>
            )}
          </div>
        )}
      </div>
    </LoginRequiredWrapper>
  );
};

const StyledList = styled.li<{ isActive?: boolean }>`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

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

export default Index;
