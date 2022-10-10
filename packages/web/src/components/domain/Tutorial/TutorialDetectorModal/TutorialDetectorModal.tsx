import { Button, Modal, Text } from '@nextui-org/react';
import { useCallback, FC } from 'react';
import { useReward } from 'react-rewards';
import { useUpdateIsExecutedTutorial } from '~/hooks/Tutorial/useUpdateIsExecutedTutorial';
import { useLocale } from '~/hooks/useLocale';
import { toastError, toastSuccess } from '~/utils/toastr';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const TutorialDetectorModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useLocale();

  const { updateIsExecutedTutorial, isLoading } = useUpdateIsExecutedTutorial();
  const { reward: confettiReward } = useReward('confettiReward', 'confetti', { zIndex: 1000, lifetime: 100 });

  const handleOkButton = useCallback(async () => {
    confettiReward();
    try {
      await updateIsExecutedTutorial().then(() => {
        toastSuccess(t.toastr_start_webev);
        onClose();
      });
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [confettiReward, onClose, t.toastr_start_webev, updateIsExecutedTutorial]);

  return (
    <Modal open={open} onClose={onClose} title={t.welcome_webev} preventClose blur>
      <Modal.Header>
        <Text h3 css={{ mb: '$20' }}>
          🎉 {t.welcome_webev} 🎉
        </Text>
      </Modal.Header>
      <Modal.Body css={{ textAlign: 'center' }}>
        <Text css={{ mb: '$4' }}>{t.tutorial_desc1}</Text>
        <Text>{t.tutorial_desc2}</Text>
        <Button color="secondary" onClick={handleOkButton} css={{ mt: '$12', fontWeight: '$bold' }} id="confettiReward" disabled={isLoading}>
          {t.start_immediately}！
        </Button>
      </Modal.Body>
    </Modal>
  );
};
