import { FC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { usePageForDelete } from '~/stores/modal';

export const DeletePageModal: FC = () => {
  const { data: pageForDelete, mutate: mutatePageForDelete } = usePageForDelete();

  const deletePage = () => {
    // TODO delete page
  };

  const closeDeleteModal = async () => {
    mutatePageForDelete(null);
  };

  return (
    <Modal isOpen={pageForDelete != null} toggle={closeDeleteModal}>
      <ModalHeader className="bg-dark">ページを削除します</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <div className={styles.fixed}>
          <a href={pageForDelete?.url} target="blank" rel="noopener noreferrer">
            <img src={pageForDelete?.image} alt={pageForDelete?.image} />
          </a>
        </div>
        <h5 className="card-title my-3">
          <a className="text-white text-decoration-none" href={pageForDelete?.url} target="blank" rel="noopener noreferrer">
            {pageForDelete?.title}
          </a>
        </h5>
        <p className="small mt-2">{pageForDelete?.description}</p>
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
