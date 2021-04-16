import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useTranslation } from 'react-i18next';
import style from 'styled-components';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageForDelete, useIsOpenDeletePageModal } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

export const DeletePageModal: VFC = () => {
  const { t } = useTranslation();

  const { data: pageForDelete } = usePageForDelete();
  const { data: isOpenDeletePageModal = false, mutate: mutateIsOpenDeletePageModal } = useIsOpenDeletePageModal();
  const { mutate: pageListMutate } = usePageListSWR();

  const [isCheckedAgree, setIsCheckedAgree] = useState(false);
  const deletePage = async () => {
    try {
      const { data: page } = await restClient.apiDelete(`/pages/${pageForDelete?._id}`);
      mutateIsOpenDeletePageModal(false);
      toastSuccess(t('toastr.delete', { target: page.url }));
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
      <ModalHeader className="bg-dark">{t('delete_page')}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <StyledImageWrapper>
          <img src={pageForDelete?.image} alt={pageForDelete?.image} />
        </StyledImageWrapper>
        <h5 className="card-title my-3">{pageForDelete?.title}</h5>
        {pageForDelete?.isFavorite && (
          <div className="form-check form-check-inline mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="deleteAgreement"
              checked={isCheckedAgree}
              onChange={() => setIsCheckedAgree(!isCheckedAgree)}
            />
            <label className="form-check-label" htmlFor="deleteAgreement">
              利用規約に同意する
            </label>
          </div>
        )}
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            {t('cancel')}
          </button>
          <button className="btn btn-danger" onClick={deletePage}>
            {t('delete')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

const StyledImageWrapper = style.div`
  position: relative;
  width: 100%;
  padding-top: 55%;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background-image: url('/spinner.gif');
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
