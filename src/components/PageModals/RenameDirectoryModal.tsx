import { useEffect, useState, VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForRename } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';
import { useDirectoryInfomation, useDirectoryListSWR } from '~/stores/directory';

export const RenameDirectoryModal: VFC = () => {
  const { t } = useLocale();
  const [name, setName] = useState<string>('');
  const { data: directoryForRename, mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateDirectory } = useDirectoryInfomation(directoryForRename?._id as string);
  const { mutate: mutateDirectoryList } = useDirectoryListSWR();

  useEffect(() => {
    if (directoryForRename != null) {
      setName(directoryForRename.name);
    }
  }, [directoryForRename]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPut(`/directories/${directoryForRename?._id}/rename`, { name });
      toastSuccess(t.toastr_update_directory_name);
      mutateDirectory();
      mutateDirectoryList();
      mutateDirectoryForRename(null);
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateDirectoryForRename(null);
  };

  return (
    <Modal isOpen={directoryForRename != null} toggle={closeDeleteModal}>
      <ModalHeader className="bg-dark">{t.rename_directory}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <form className="input-group my-2" onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
          <button className="btn btn-success" type="submit" disabled={name.trim() === '' || name === directoryForRename?.name}>
            {t.save}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};
