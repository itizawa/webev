import { ReactNode, VFC } from 'react';
import { Modal as ReactStrapModal, ModalHeader, ModalBody } from 'reactstrap';

import { IconButton } from '../IconButton';

type Props = {
  isOpen: boolean;
  toggle?: () => void;
  title: string;
  children: ReactNode;
};

export const Modal: VFC<Props> = ({ isOpen, toggle, title, children }) => {
  return (
    <ReactStrapModal size="lg" isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-dark">
        {title}
        {toggle != null && <IconButton color="LIGHT" buttonColor="SECONDARY" activeColor="LIGHT" icon="CLOSE" onClickButton={toggle} />}
      </ModalHeader>
      <ModalBody className="bg-dark text-break">{children}</ModalBody>
    </ReactStrapModal>
  );
};
