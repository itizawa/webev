import { useContext } from 'react';
import { ModalContext } from '~/components/providers/ModalProvider';

export const useModal = () => {
  const { handleModal } = useContext(ModalContext);

  return { handleModal };
};
