import { useEffect, useState, VFC } from 'react';
import { useRouter } from 'next/router';

import { restClient } from '@monorepo/webev-client/src/utils/rest-client';
import { toastError, toastSuccess } from '@monorepo/webev-client/src/utils/toastr';

import { useDirectoryForRename } from '@monorepo/webev-client/src/stores/modal';

import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';
import {
  useAllDirectories,
  useDirectoryChildren,
  useDirectoryInformation,
  useDirectoryPaginationResult,
} from '@monorepo/webev-client/src/stores/directory';
import { Modal } from '../../../../base/molecules/Modal';

export const DirectoryRenameModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const { data: directoryForRename, mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateDirectory } = useDirectoryInformation(directoryForRename?._id as string);
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(router.query?.id as string);
  const { mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });
  const { mutate: mutateAllDirectories } = useAllDirectories();

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
      mutateDirectoryPaginationResult();
      mutateDirectoryChildren();
      mutateAllDirectories();
      mutateDirectoryForRename(null);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateDirectoryForRename(null);
  };

  return (
    <Modal isOpen={directoryForRename != null} toggle={closeDeleteModal} title={t.rename_directory}>
      <form className="input-group my-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control bg-white"
          placeholder="...name"
          autoFocus
        />
        <button className="btn btn-success" type="submit" disabled={name.trim() === '' || name === directoryForRename?.name}>
          {t.save}
        </button>
      </form>
    </Modal>
  );
};
