import { Button, Grid, Input, Modal, Text, Textarea } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';
import { useReward } from 'react-rewards';
import { useLocale } from './useLocale';
import { Icon } from '~/components/base/atoms/Icon';
import { Magazine } from '~/domains/Magazine';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  magazine?: Magazine;
};

export const EditMagazineModal: FC<Props> = ({ open, onClose, onSubmit, magazine }) => {
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [newMagazine, setNewMagazine] = useState<Magazine>(magazine || Magazine.create({ name: '', description: '', createdUserId: '' }));
  const { reward: confettiReward } = useReward('confettiReward', 'confetti', { zIndex: 1000, lifetime: 100 });

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (magazine) {
        await restClient.apiPut(`/magazines/${magazine.id}`, { name: newMagazine.name, description: newMagazine.description });
      } else {
        await restClient.apiPost(`/magazines`, { name: newMagazine.name, description: newMagazine.description });
        confettiReward();
      }
      onSubmit();
      setTimeout(() => {
        setIsLoading(false);
        toastSuccess('Create Magazine');
        onClose();
      }, 1200);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [confettiReward, magazine, newMagazine.description, newMagazine.name, onClose, onSubmit]);

  return (
    <Modal open={open} onClose={onClose} width="600px">
      <Modal.Header>
        <Text h4 css={{ textTransform: 'capitalize' }}>
          {magazine ? t.edit_magazine : t.create_magazine}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          label={t.name}
          value={newMagazine.name}
          onChange={(e) => setNewMagazine(new Magazine({ ...newMagazine, name: e.target.value }))}
          fullWidth
          animated={false}
          placeholder={t.name_desc}
          bordered
          required
        />
        <Textarea
          label={t.description}
          value={newMagazine.description}
          onChange={(e) => setNewMagazine(new Magazine({ ...newMagazine, description: e.target.value }))}
          placeholder={t.description_desc}
          minRows={4}
          animated={false}
          maxRows={10}
          bordered
        />
        <Grid css={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            icon={<Icon icon={magazine ? 'UPDATE' : 'PLUS_LARGE'} />}
            color="secondary"
            id="confettiReward"
            css={{ fontWeight: '$bold', textTransform: 'capitalize' }}
            disabled={!newMagazine.name.trim() || isLoading}
          >
            {magazine ? t.update : t.create}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
