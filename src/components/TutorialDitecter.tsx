import { VFC } from 'react';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useLocale } from '~/hooks/useLocale';
import { useCurrentUser } from '~/stores/user';

export const TutorialDitecter: VFC = () => {
  const { data: currentUser } = useCurrentUser();
  const { t } = useLocale();

  return (
    <Modal isOpen={!currentUser?.isExecutedTutorial}>
      <ModalHeader className="bg-dark">{t.welcome_webev}</ModalHeader>
      <ModalBody className="bg-dark text-break text-center">
        <h3>{t.welcome_webev}</h3>
        <p>
          {t.tutorial_desc1}
          <br />
          {t.tutorial_desc2}
        </p>
        <p dangerouslySetInnerHTML={{ __html: t.tutorial_desc3 }} />
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-indigo" onClick={() => console.log('hoge')}>
            OK
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
