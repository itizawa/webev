import { VFC, useState } from 'react';

import { Modal } from '@monorepo/client/src/components/base/molecules/Modal';
import { restClient } from '@monorepo/client/src/utils/rest-client';
import { toastError, toastSuccess } from '@monorepo/client/src/utils/toastr';

import { useParentDirectoryForCreateDirectory } from '@monorepo/client/src/stores/modal';

import { useLocale } from '@monorepo/client/src/hooks/useLocale';
import { useDirectoryChildren } from '@monorepo/client/src/stores/directory';

export const DirectoryCreateModal: VFC = () => {
  const { t } = useLocale();

  const { data: parentDirectoryForCreateDirectory, mutate: mutateParentDirectoryForCreateDirectory } = useParentDirectoryForCreateDirectory();
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(parentDirectoryForCreateDirectory?._id);

  const [name, setName] = useState('');

  const closeDeleteModal = async () => {
    mutateParentDirectoryForCreateDirectory(null);
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
      mutateDirectoryChildren();
      closeDeleteModal();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  return (
    <Modal isOpen={parentDirectoryForCreateDirectory != null} toggle={closeDeleteModal} title={t.create_directory}>
      {parentDirectoryForCreateDirectory != null && (
        <p className="text-center">{t.create_child_directory(parentDirectoryForCreateDirectory.name)}</p>
      )}
      <form className="input-group my-2" onSubmit={handleSubmitCreateDirectory}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control bg-white"
          placeholder="...name"
          autoFocus
        />
        <button className="btn btn-success" type="submit">
          {t.create}
        </button>
      </form>
    </Modal>
  );
};
