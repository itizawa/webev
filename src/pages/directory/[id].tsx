import { useEffect, useState, VFC } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useLocale } from '~/hooks/useLocale';

import { useDirectoryInfomation } from '~/stores/directory';
import { useDirectoryId, useIsRetrieveFavoritePageList, usePageListSWR } from '~/stores/page';
import { useDirectoryForDelete, useIsOpenDeleteDirectoryModal } from '~/stores/modal';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { OgpCard } from '~/components/organisms/OgpCard';
import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { IconButton } from '~/components/Icons/IconButton';
import { Icon } from '~/components/Icons/Icon';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';

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
  const { data: paginationResult } = usePageListSWR();

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
      setIsEditing(false);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          {directory != null && (
            <div className="d-flex align-items-center">
              <div>
                <small>
                  <Link href="/directory">
                    <a className="text-decoration-none text-white">Directory</a>
                  </Link>
                  <span className="ms-1">{'/'}</span>
                </small>
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
                  <h1>{directory?.name}</h1>
                )}
              </div>
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
                <NoPageAlert />
              ) : (
                <div className="text-center">
                  <PaginationWrapper pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
                </div>
              )}
            </div>
          )}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
