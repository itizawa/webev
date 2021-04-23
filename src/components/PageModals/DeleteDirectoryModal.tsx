import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import style from 'styled-components';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForDelete, useIsOpenDeleteDirectoryModal } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

export const DeleteDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const { data: directoryForDelete } = useDirectoryForDelete();
  const { data: isOpenDeleteDirectoryModal = false, mutate: mutateIsOpenDeleteDirectoryModal } = useIsOpenDeleteDirectoryModal();

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/directories/${directoryForDelete?._id}`);
      mutateIsOpenDeleteDirectoryModal(false);
      toastSuccess(t.toastr_delete_directory);
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateIsOpenDeleteDirectoryModal(false);
  };

  return (
    <Modal isOpen={isOpenDeleteDirectoryModal} toggle={closeDeleteModal}>
      <ModalHeader className="bg-dark">{t.delete_directory}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <h5 className="mt-3 mb-5 text-center">{directoryForDelete?.name}</h5>
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            {t.cancel}
          </button>
          <button className="btn btn-danger" onClick={deletePage}>
            {t.delete}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
