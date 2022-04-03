import { useContext } from 'react';
import { ModalContext } from '@monorepo/webev-client/src/components/providers/ModalProvider';

export const useModal = () => {
  const { handleModal } = useContext(ModalContext);

  return { handleModal };
};
