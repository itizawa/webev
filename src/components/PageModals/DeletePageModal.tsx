import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { FixedImage } from '~/components/Atoms/FixedImage';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageForDelete, useIsOpenDeletePageModal } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

export const DeletePageModal: VFC = () => {
  const { t } = useLocale();

  const { data: pageForDelete } = usePageForDelete();
  const { data: isOpenDeletePageModal = false, mutate: mutateIsOpenDeletePageModal } = useIsOpenDeletePageModal();
  const { mutate: pageListMutate } = usePageListSWR();

  const [isCheckedAgree, setIsCheckedAgree] = useState(false);
  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/pages/${pageForDelete?._id}`);
      mutateIsOpenDeletePageModal(false);
      toastSuccess(t.toastr_delete_url);
      pageListMutate();
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutateIsOpenDeletePageModal(false);
  };

  return (
    <Modal isOpen={isOpenDeletePageModal} toggle={closeDeleteModal}>
      <ModalHeader className="bg-dark">{t.delete_page}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <FixedImage imageUrl={pageForDelete?.image} />
        <h5 className="card-title my-3">{pageForDelete?.title}</h5>
        {pageForDelete?.isFavorite && (
          <div className="form-check form-check-inline mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="deleteAgreement"
              checked={isCheckedAgree}
              onChange={() => setIsCheckedAgree(!isCheckedAgree)}
            />
            <label className="form-check-label" htmlFor="deleteAgreement">
              {t.delete_favorite_page}
            </label>
            <div id="deleteFavoritePageHelp" className="form-text">
              {t.delete_favorite_page_desc}
            </div>
          </div>
        )}
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            {t.cancel}
          </button>
          <button className="btn btn-danger" onClick={deletePage} disabled={pageForDelete?.isFavorite && !isCheckedAgree}>
            {t.delete}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
