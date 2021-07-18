import { useEffect, useState, VFC } from 'react';
import { useRouter } from 'next/router';

import { Modal } from '../../../../base/molecules/Modal';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForRename } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';
import { useAllDirectories, useAllParentDirectories, useDirectoryChildren, useDirectoryInfomation } from '~/stores/directory';

export const DirectoryRenameModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const { data: directoryForRename, mutate: mutateDirectoryForRename } = useDirectoryForRename();
  const { mutate: mutateDirectory } = useDirectoryInfomation(directoryForRename?._id as string);
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(router.query?.id as string);
  const { mutate: mutateAllParentDirectories } = useAllParentDirectories();
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
      mutateAllParentDirectories();
      mutateDirectoryChildren();
      mutateAllDirectories();
      mutateDirectoryForRename(null);
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateDirectoryForRename(null);
  };

  return (
    <Modal isOpen={directoryForRename != null} toggle={closeDeleteModal} title={t.rename_directory}>
      <form className="input-group my-2" onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
        <button className="btn btn-success" type="submit" disabled={name.trim() === '' || name === directoryForRename?.name}>
          {t.save}
        </button>
      </form>
    </Modal>
  );
};
