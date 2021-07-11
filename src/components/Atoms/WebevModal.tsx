import { FC } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styled from 'styled-components';
import { IconButton } from '../Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
};

export const WebevModal: FC<Props> = (props) => {
  const { isOpen, toggle, title, children } = props;

  return (
    <Modal size="lg" isOpen={isOpen} toggle={toggle}>
      <StyledModalHeader className="bg-dark">
        {title}
        <IconButton
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CLOSE}
          onClickButton={toggle}
        />
      </StyledModalHeader>
      <ModalBody className="bg-dark text-break">{children}</ModalBody>
    </Modal>
  );
};

const StyledModalHeader = styled(ModalHeader)`
  .modal-title {
    display: contents;
  }
`;
