import React, { useState, createContext, ReactNode, useContext, useCallback, FC, ComponentProps } from 'react';
import { EditMagazineModal } from '@webev/web/components/domain/Magazine';

import { AddMagazineModal, DeletePageModal } from '@webev/web/components/domain/Page';
import { ShareLinkReceiverModal } from '@webev/web/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '@webev/web/components/domain/Tutorial/TutorialDetectorModal';

type AddMagazineModal = {
  name: 'AddMagazineModal';
  args: Omit<ComponentProps<typeof AddMagazineModal>, 'open' | 'onClose'>;
};

type EditMagazineModal = {
  name: 'EditMagazineModal';
  args: Omit<ComponentProps<typeof EditMagazineModal>, 'open' | 'onClose'>;
};

type DeletePageModal = {
  name: 'deletePageModal';
  args: Omit<ComponentProps<typeof DeletePageModal>, 'open' | 'onClose'>;
};

type ShareLinkReceiverModal = {
  name: 'shareLinkReceiverModal';
  args: Omit<ComponentProps<typeof ShareLinkReceiverModal>, 'open' | 'onClose'>;
};

type TutorialDetectorModal = {
  name: 'tutorialDetectorModal';
  args: Omit<ComponentProps<typeof TutorialDetectorModal>, 'open' | 'onClose'>;
};

type ModalProps = AddMagazineModal | EditMagazineModal | DeletePageModal | ShareLinkReceiverModal | TutorialDetectorModal | undefined | null;

const DURATION = 195; // モーダルの開閉のアニメーション時間

export const ModalContext = createContext<{
  modal: ModalProps;
  open: boolean;
  handleModal: (props: ModalProps) => void;
}>({ modal: undefined, open: false, handleModal: () => void 0 });

export const ModalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps>();
  const [open, setOpen] = useState(false);

  const handleModal = useCallback((args: ModalProps) => {
    if (!args) {
      // モーダルを閉じるときは先にopenをfalsyにして閉じるアニメーションを実行する
      setOpen(false);
      // アニメーションが終了したらmodalをnullにしてコンポーネントを破棄する
      setTimeout(() => setModal(null), DURATION);
    } else {
      setModal(args);
      setOpen(true);
    }
  }, []);

  return (
    <ModalContext.Provider value={{ modal, open, handleModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

const Modal = () => {
  const { modal, open, handleModal } = useContext(ModalContext);
  const handleCancel = useCallback(() => handleModal(null), [handleModal]);

  if (!modal) return null;

  switch (modal.name) {
    case 'AddMagazineModal': {
      return <AddMagazineModal open={open} onClose={handleCancel} {...modal.args} />;
    }
    case 'EditMagazineModal': {
      return <EditMagazineModal open={open} onClose={handleCancel} {...modal.args} />;
    }
    case 'deletePageModal': {
      return <DeletePageModal open={open} onClose={handleCancel} {...modal.args} />;
    }
    case 'shareLinkReceiverModal': {
      return <ShareLinkReceiverModal open={open} onClose={handleCancel} {...modal.args} />;
    }
    case 'tutorialDetectorModal': {
      return <TutorialDetectorModal open={open} onClose={handleCancel} />;
    }
  }
};
