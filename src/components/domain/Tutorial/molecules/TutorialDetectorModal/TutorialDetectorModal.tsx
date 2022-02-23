import { useCallback, useRef, VFC } from 'react';

import Reward, { RewardElement } from 'react-rewards';
import { Modal } from '~/components/base/molecules/Modal';
import { useUpdateIsExecutedTutorial } from '~/hooks/Tutorial/useUpdateIsExecutedTutorial';

import { useLocale } from '~/hooks/useLocale';
import { useCurrentUser } from '~/stores/user';

import { toastError, toastSuccess } from '~/utils/toastr';

export const TutorialDetectorModal: VFC = () => {
  const { t } = useLocale();

  const { data: currentUser } = useCurrentUser();
  const { isLoading, updateIsExecutedTutorial } = useUpdateIsExecutedTutorial();

  const okButtonRef = useRef<RewardElement>(null);

  const handleOkButton = useCallback(async () => {
    if (!okButtonRef.current) return;

    try {
      okButtonRef.current.rewardMe();
      await updateIsExecutedTutorial();
      toastSuccess(t.toastr_start_webev);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [t.toastr_start_webev, updateIsExecutedTutorial]);

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
        <Reward ref={okButtonRef} type="confetti" config={{ zIndex: 1000, springAnimation: false, lifetime: 100 }}>
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-indigo" onClick={handleOkButton} disabled={isLoading}>
              {t.start_immediately}
            </button>
          </div>
        </Reward>
      </div>
    </Modal>
  );
};
