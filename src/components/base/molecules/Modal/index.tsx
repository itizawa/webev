import { FC } from 'react';
import { Modal as ReactStrapModal, ModalHeader, ModalBody } from 'reactstrap';

import styled from 'styled-components';
import { IconButton } from '../../../Icons/IconButton';

type Props = {
  isOpen: boolean;
  toggle?: () => void;
  title: string;
};

export const Modal: FC<Props> = (props) => {
  const { isOpen, toggle, title, children } = props;

  return (
    <ReactStrapModal size="lg" isOpen={isOpen} toggle={toggle}>
      <StyledModalHeader className="bg-dark">
        {title}
        {toggle != null && <IconButton color="LIGHT" buttonColor="SECONDARY" activeColor="LIGHT" icon="CLOSE" onClickButton={toggle} />}
      </StyledModalHeader>
      <ModalBody className="bg-dark text-break">{children}</ModalBody>
    </ReactStrapModal>
  );
};

const StyledModalHeader = styled(ModalHeader)`
  .modal-title {
    display: contents;
  }
`;
