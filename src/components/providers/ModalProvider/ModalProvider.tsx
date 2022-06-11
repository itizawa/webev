import React, { useState, createContext, ReactNode, useContext, useCallback, FC } from 'react';

import { DeletePageModal } from '~/components/domain/Page';
import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '~/components/domain/Tutorial/TutorialDetectorModal';

type DeletePageModal = {
  name: 'deletePageModal';
  args: { targetPageId: string };
};

type ShareLinkReceiverModal = {
  name: 'shareLinkReceiverModal';
  args: { url: string };
};

type TutorialDetectorModal = {
  name: 'tutorialDetectorModal';
  args: {};
};

type ModalProps = DeletePageModal | ShareLinkReceiverModal | TutorialDetectorModal | undefined | null;

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
    case 'deletePageModal': {
      return <DeletePageModal open={open} onClose={handleCancel} pageId={modal.args.targetPageId} />;
    }
    case 'shareLinkReceiverModal': {
      return <ShareLinkReceiverModal open={open} onClose={handleCancel} url={modal.args.url} />;
    }
    case 'tutorialDetectorModal': {
      return <TutorialDetectorModal open={open} onClose={handleCancel} />;
    }
  }
};
