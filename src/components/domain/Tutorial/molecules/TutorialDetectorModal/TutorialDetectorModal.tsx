import { useRef, VFC } from 'react';

import Reward from 'react-rewards';
import { Modal } from '~/components/base/molecules/Modal';
import { useUpdateIsExecutedTutorial } from '~/hooks/Tutorial/useUpdateIsExecutedTutorial';

import { useLocale } from '~/hooks/useLocale';
import { useCurrentUser } from '~/stores/user';

import { toastError, toastSuccess } from '~/utils/toastr';

export const TutorialDetectorModal: VFC = () => {
  const { t } = useLocale();

  const { data: currentUser } = useCurrentUser();
  const { updateIsExecutedTutorial } = useUpdateIsExecutedTutorial();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const okButtonRef = useRef<any>(null);

  const handleOkButton = async () => {
    try {
      okButtonRef.current.rewardMe();
      await updateIsExecutedTutorial();
      toastSuccess(t.toastr_save_url);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal isOpen={!currentUser?.isExecutedTutorial} title={t.welcome_webev}>
      <div className="text-center">
        <h3>🎉 {t.welcome_webev} 🎉</h3>
        <p>
          {t.tutorial_desc1}
          <br />
          {t.tutorial_desc2}
        </p>
        <p dangerouslySetInnerHTML={{ __html: t.tutorial_desc3 }} />
        <div className="d-flex justify-content-center mt-5">
          <Reward ref={okButtonRef} type="confetti" config={{ zIndex: 1000, springAnimation: false, lifetime: 100 }}>
            <button className="btn btn-indigo" onClick={handleOkButton}>
              {t.start_immediately}
            </button>
          </Reward>
        </div>
      </div>
    </Modal>
  );
};
