import { VFC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useIsOpenAddDirectoryModal } from '~/stores/modal';

export const AddDirectoryModal: VFC = () => {
  const { data: isOpenAddDirectoryModal = false, mutate: mutateIsOpenAddDirectoryModal } = useIsOpenAddDirectoryModal();

  return (
    <Modal isOpen={isOpenAddDirectoryModal} toggle={() => mutateIsOpenAddDirectoryModal(false)}>
      <ModalHeader className="bg-dark">{t('delete_page')}</ModalHeader>
      <ModalBody className="bg-dark text-break">hoge</ModalBody>
    </Modal>
  );
};
