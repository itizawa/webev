import { VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useTranslation } from 'react-i18next';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { usePageForDelete, useIsOpenDeletePageModal } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

export const DeletePageModal: VFC = () => {
  const { t } = useTranslation();

  const { data: pageForDelete } = usePageForDelete();
  const { data: isOpenDeletePageModal = false, mutate: mutateIsOpenDeletePageModal } = useIsOpenDeletePageModal();
  const { mutate: pageListMutate } = usePageListSWR();

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
        <div className={styles.fixed}>
          <img src={pageForDelete?.image} alt={pageForDelete?.image} />
        </div>
        <h5 className="card-title my-3">{pageForDelete?.title}</h5>
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-danger" onClick={deletePage}>
            {t('delete')}
          </button>
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            {t('cancel')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
