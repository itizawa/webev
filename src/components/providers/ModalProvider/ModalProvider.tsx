import React, { VFC, useState, createContext, ReactNode, useContext, useCallback } from 'react';

import { DeletePageModal } from '~/components/domain/Page';
import { Page } from '~/domains/Page';

type DeletePageModalType = {
  name?: 'deletePageModal' | null;
  args?: { targetPage: Page };
};

type ModalProps = DeletePageModalType | undefined | null;

const DURATION = 195; // モーダルの開閉のアニメーション時間

export const ModalContext = createContext<{
  modal: ModalProps;
  handleModal: (props: ModalProps) => void;
}>({ modal: undefined, handleModal: () => void 0 });

export const ModalProvider: VFC<{
  children: ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps>();

  const handleModal = useCallback((args: ModalProps) => {
    if (!args) {
      // モーダルを閉じるときは先にnameをfalsyにして閉じるアニメーションを実行する
      setModal((prev) => ({ ...prev, name: null }));
      // アニメーションが終了したらオブジェクトをnullにしてコンポーネントを破棄する
      setTimeout(() => setModal(null), DURATION);
    } else {
      setModal(args);
    }
  }, []);

  return (
    <ModalContext.Provider value={{ modal, handleModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

const Modal = () => {
  const { modal, handleModal } = useContext(ModalContext);
  const handleCancel = useCallback(() => handleModal(null), [handleModal]);

  if (!modal) return null;

  return <>{modal.args && <DeletePageModal open={modal.name === 'deletePageModal'} onClose={handleCancel} page={modal.args.targetPage} />}</>;
};
