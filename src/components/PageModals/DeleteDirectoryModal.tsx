import { VFC } from 'react';

import { useRouter } from 'next/router';
import { Modal } from '~/components/base/molecules/Modal';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForDelete } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';
import { useAllParentDirectories, useDirectoryChildren } from '~/stores/directory';

export const DeleteDirectoryModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: directoryForDelete, mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(router.query?.id as string);
  const { mutate: mutateAllParentDirectories } = useAllParentDirectories();

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/directories/${directoryForDelete?._id}`);
      toastSuccess(t.toastr_delete_directory);
      // delete current pgae directory
      if (router.query.id === directoryForDelete?._id) {
        router.push('/directory');
      }
      mutateAllParentDirectories();
      mutateDirectoryChildren();
      mutateDirectoryForDelete(null);
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateDirectoryForDelete(null);
  };

  return (
    <Modal isOpen={directoryForDelete != null} toggle={closeDeleteModal} title={t.delete_directory}>
      <h5 className="mt-3 mb-5 text-center">{directoryForDelete?.name}</h5>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-secondary" onClick={closeDeleteModal}>
          {t.cancel}
        </button>
        <button className="btn btn-danger" onClick={deletePage}>
          {t.delete}
        </button>
      </div>
    </Modal>
  );
};
