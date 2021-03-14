import { FC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { usePageForDelete, useIsOpenDeletePageModal } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

export const DeletePageModal: FC = () => {
  const { data: pageForDelete } = usePageForDelete();
  const { data: isOpenDeletePageModal = false, mutate: mutateIsOpenDeletePageModal } = useIsOpenDeletePageModal();
  const { mutate: pageListMutate } = usePageListSWR();

  const deletePage = async () => {
    try {
      const { data: page } = await restClient.apiDelete(`/pages/${pageForDelete?._id}`);
      mutateIsOpenDeletePageModal(false);
      toastSuccess(`${page.url} を削除しました`);
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
      <ModalHeader className="bg-dark">ページを削除します</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <div className={styles.fixed}>
          <img src={pageForDelete?.image} alt={pageForDelete?.image} />
        </div>
        <h5 className="card-title my-3">{pageForDelete?.title}</h5>
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-danger" onClick={deletePage}>
            削除する
          </button>
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            キャンセル
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
