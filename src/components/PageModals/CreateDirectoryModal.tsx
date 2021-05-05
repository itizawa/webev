import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useParentDirectoryForCreateDirectory, useIsOpenCreateDirectoryModal } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';
import { useDirectoryChildren } from '~/stores/directory';

export const CreateDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const { data: parentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();
  const { data: isOpenCreateDirectoryModal = false, mutate: mutateIsOpenCreateDirectoryModal } = useIsOpenCreateDirectoryModal();
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(parentDirectoryForCreateDirectory?._id);

  const [name, setName] = useState('');

  const closeDeleteModal = async () => {
    mutateIsOpenCreateDirectoryModal(false);
  };

  const handleSubmitCreateDirectory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '') {
      return closeDeleteModal();
    }

    try {
      await restClient.apiPost('/directories', { name, parentDirectoryId: parentDirectoryForCreateDirectory?._id });
      toastSuccess(t.toastr_save_directory);
      setName('');
      closeDeleteModal();
      mutateDirectoryChildren();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal isOpen={isOpenCreateDirectoryModal} toggle={closeDeleteModal}>
      <ModalHeader className="bg-dark">{t.create_directory}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        {parentDirectoryForCreateDirectory != null && <p className="text-center">{t.create_child_directory(parentDirectoryForCreateDirectory.name)}</p>}
        <form className="input-group my-2" onSubmit={handleSubmitCreateDirectory}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
          <button className="btn btn-success" type="submit">
            {t.create}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};
