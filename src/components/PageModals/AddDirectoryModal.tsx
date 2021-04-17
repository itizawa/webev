import { VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';
import { Icon } from '../Icons/Icon';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryListSWR } from '~/stores/directory';
import { useIsOpenAddDirectoryModal, usePageForAddDirectory } from '~/stores/modal';
import { Directory } from '~/interfaces/directory';
import { useLocale } from '~/hooks/useLocale';
import { usePageListSWR } from '~/stores/page';

export const AddDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const { data: pageForAddDirectory } = usePageForAddDirectory();
  const { data: isOpenAddDirectoryModal = false, mutate: mutateIsOpenAddDirectoryModal } = useIsOpenAddDirectoryModal();

  const { data: paginationResult } = useDirectoryListSWR();
  const { mutate: mutatePageList } = usePageListSWR();

  const addPageTODirectory = async (directory: Directory) => {
    try {
      await restClient.apiPut(`/pages/${pageForAddDirectory?._id}/directories`, {
        directoryId: directory._id,
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
              <img src={pageForAddDirectory?.image} alt={pageForAddDirectory?.image} />
            </StyledImageWrapper>
            <h5 className="card-title my-1">{pageForAddDirectory?.title}</h5>
          </div>
          <div className="col-12 col-md-2 text-center">
            <div className="d-none d-md-block mt-5">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_RIGHT} color={BootstrapColor.WHITE} />
            </div>
            <div className="d-md-none d-block my-3">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_DOWN} color={BootstrapColor.WHITE} />
            </div>
          </div>
          <div className="col-12 col-md-5">
            {paginationResult?.docs.map((directory) => {
              if (pageForAddDirectory?.directoryId == directory._id) {
                return null;
              }
              return (
                <div key={directory._id} onClick={() => addPageTODirectory(directory)} role="button">
                  <StyledList className="list-group-item border-0">
                    <span>{directory.name}</span>
                  </StyledList>
                </div>
              );
            })}
          </div>
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

const StyledList = styled.li`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  :hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }
`;
