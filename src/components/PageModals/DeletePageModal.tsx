import { FC } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { usePageForDelete } from '~/stores/modal';

export const DeletePageModal: FC = () => {
  const { data: pageForDelete, mutate: mutatePageForDelete } = usePageForDelete();

  console.log(pageForDelete);

  const closeDeleteModal = async () => {
    mutatePageForDelete(null);
  };

  return (
    <Modal isOpen={pageForDelete != null} toggle={closeDeleteModal}>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={closeDeleteModal}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};
