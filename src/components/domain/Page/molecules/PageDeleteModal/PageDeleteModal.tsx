import { VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { FixedImage } from '~/components/base/atoms/FixedImage';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageForDelete } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

export const PageDeleteModal: VFC = () => {
  const { t } = useLocale();

  const { data: pageForDelete, mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: pageListMutate } = usePageListSWR({});

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/pages/${pageForDelete?._id}`);
      mutatePageForDelete(null);
      toastSuccess(t.toastr_delete_url);
      pageListMutate();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutatePageForDelete(null);
  };

  return (
    <Modal isOpen={pageForDelete != null} toggle={closeDeleteModal} title={t.delete_page}>
      <FixedImage imageUrl={pageForDelete?.image} />
      <h5 className="card-title my-3">{pageForDelete?.title}</h5>
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
