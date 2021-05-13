import { VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useRouter } from 'next/router';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForDelete } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';

export const DeleteDirectoryModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: directoryForDelete, mutate: mutateDirectoryForDelete } = useDirectoryForDelete();

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/directories/${directoryForDelete?._id}`);
      mutateDirectoryForDelete(null);
      toastSuccess(t.toastr_delete_directory);
      router.push('/directory');
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateDirectoryForDelete(null);
  };

  return (
    <Modal isOpen={directoryForDelete != null} toggle={closeDeleteModal}>
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
