import { VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { toastError } from '~/utils/toastr';

import { useLocale } from '~/hooks/useLocale';
// import { useDirectoryForDelete } from '~/stores/modal';

export const DirectoryDeleteModal: VFC = () => {
  const { t } = useLocale();
  // const router = useRouter();

  // const { data: directoryForDelete, mutate: mutateDirectoryForDelete } = useDirectoryForDelete();
  // const { mutate: mutateDirectoryChildren } = useDirectoryChildren(router.query?.id as string);
  // const { mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });

  const deletePage = async () => {
    try {
      // await restClient.apiDelete(`/directories/${directoryForDelete?._id}`);
      // toastSuccess(t.toastr_delete_directory);
      // if (router.query.id === directoryForDelete?._id) {
      //   router.push(DIRECTORY_INDEX_URL);
      // }
      // mutateDirectoryPaginationResult();
      // mutateDirectoryChildren();
      // mutateDirectoryForDelete(null);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    // mutateDirectoryForDelete(null);
  };

  return (
    <Modal isOpen={'directoryForDelete' != null} toggle={closeDeleteModal} title={t.delete_directory}>
      {/* <h5 className="mt-3 mb-5 text-center">{"directoryForDelete"?.name}</h5> */}
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
