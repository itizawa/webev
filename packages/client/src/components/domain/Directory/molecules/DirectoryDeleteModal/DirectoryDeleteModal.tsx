import { VFC } from 'react';

import { useRouter } from 'next/router';
import { Modal } from '@monorepo/webev-client/src/components/base/molecules/Modal';
import { restClient } from '@monorepo/webev-client/src/utils/rest-client';
import { toastError, toastSuccess } from '@monorepo/webev-client/src/utils/toastr';

import { DIRECTORY_INDEX_URL } from '@monorepo/webev-client/src/libs/constants/urls';

import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';
import { useDirectoryForDelete } from '@monorepo/webev-client/src/stores/modal';
import { useDirectoryChildren, useDirectoryPaginationResult } from '@monorepo/webev-client/src/stores/directory';

export const DirectoryDeleteModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: directoryForDelete, mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  const { mutate: mutateDirectoryChildren } = useDirectoryChildren(router.query?.id as string);
  const { mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/directories/${directoryForDelete?._id}`);
      toastSuccess(t.toastr_delete_directory);
      if (router.query.id === directoryForDelete?._id) {
        router.push(DIRECTORY_INDEX_URL);
      }
      mutateDirectoryPaginationResult();
      mutateDirectoryChildren();
      mutateDirectoryForDelete(null);
    } catch (err) {
      if (err instanceof Error) toastError(err);
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
