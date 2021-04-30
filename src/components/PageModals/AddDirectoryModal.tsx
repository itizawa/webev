import { VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';

import { DirectoryItem } from '~/components/Directory/DirectoryItem';
import { Icon } from '~/components/Icons/Icon';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryListSWR } from '~/stores/directory';
import { useIsOpenAddDirectoryModal, usePageForAddDirectory } from '~/stores/modal';
import { useLocale } from '~/hooks/useLocale';
import { usePageListSWR } from '~/stores/page';
import { imagePath } from '~/const/imagePath';

export const AddDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const { data: pageForAddDirectory } = usePageForAddDirectory();
  const { data: isOpenAddDirectoryModal = false, mutate: mutateIsOpenAddDirectoryModal } = useIsOpenAddDirectoryModal();

  const { data: paginationResult } = useDirectoryListSWR();
  const { mutate: mutatePageList } = usePageListSWR();

  const addPageTODirectory = async (directoryId: string) => {
    try {
      await restClient.apiPut(`/pages/${pageForAddDirectory?._id}/directories`, {
        directoryId,
      });
      mutateIsOpenAddDirectoryModal(false);
      mutatePageList();
      toastSuccess(t.toastr_success_add_directory);
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  return (
    <Modal isOpen={isOpenAddDirectoryModal} toggle={() => mutateIsOpenAddDirectoryModal(false)} size="lg">
      <ModalHeader className="bg-dark">{t.move_directory}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <div className="row">
          <div className="col-12 col-md-5">
            <StyledImageWrapper>
              <img src={pageForAddDirectory?.image || imagePath.NO_IMAGE} alt={pageForAddDirectory?.image || imagePath.NO_IMAGE} />
            </StyledImageWrapper>
            <h5 className="card-title my-1">{pageForAddDirectory?.title || pageForAddDirectory?.url}</h5>
          </div>
          <div className="col-12 col-md-2 text-center">
            <div className="d-none d-md-block mt-5">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_RIGHT} color={BootstrapColor.WHITE} />
            </div>
            <div className="d-md-none d-block my-3">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_DOWN} color={BootstrapColor.WHITE} />
            </div>
          </div>
          <StyledDiv className="col-12 col-md-5">
            {paginationResult?.docs.map((directory) => {
              return <DirectoryItem key={directory._id} directory={directory} onClickDirectory={addPageTODirectory} />;
            })}
          </StyledDiv>
        </div>
        <div className="mt-3 text-center" onClick={() => mutateIsOpenAddDirectoryModal(false)}>
          <button className="btn btn-secondary w-100">Cancel</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 55%;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background-image: url('/spinner.gif');
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const StyledDiv = styled.div`
  max-height: 500px;
  overflow: scroll;
`;
