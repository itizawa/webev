import { useCallback, VFC } from 'react';

import { useReward } from 'react-rewards';
import { Modal } from '~/components/base/molecules/Modal';
import { useUpdateIsExecutedTutorial } from '~/hooks/Tutorial/useUpdateIsExecutedTutorial';

import { useLocale } from '~/hooks/useLocale';
// import { useCurrentUser } from '~/stores/user';

import { toastError, toastSuccess } from '~/utils/toastr';

export const TutorialDetectorModal: VFC = () => {
  const { t } = useLocale();

  // const { data: currentUser } = useCurrentUser();
  const { isLoading, updateIsExecutedTutorial } = useUpdateIsExecutedTutorial();
  const { reward: confettiReward } = useReward('confettiReward', 'confetti', { zIndex: 1000, lifetime: 100 });

  const handleOkButton = useCallback(async () => {
    try {
      confettiReward();
      await updateIsExecutedTutorial();
      toastSuccess(t.toastr_start_webev);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [confettiReward, t.toastr_start_webev, updateIsExecutedTutorial]);

  return (
    <Modal isOpen title={t.welcome_webev}>
      <div className="text-center">
        <h3>🎉 {t.welcome_webev} 🎉</h3>
        <p>
          {t.tutorial_desc1}
          <br />
          {t.tutorial_desc2}
        </p>
        <p dangerouslySetInnerHTML={{ __html: t.tutorial_desc3 }} />
        <div className="d-flex justify-content-center mt-5" id="confettiReward">
          <button className="btn btn-indigo" onClick={handleOkButton} disabled={isLoading}>
            {t.start_immediately}
          </button>
        </div>
      </div>
    </Modal>
  );
};
