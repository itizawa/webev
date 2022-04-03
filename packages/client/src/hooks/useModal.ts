import { useContext } from 'react';
import { ModalContext } from '@monorepo/client/src/components/providers/ModalProvider';

export const useModal = () => {
  const { handleModal } = useContext(ModalContext);

  return { handleModal };
};
