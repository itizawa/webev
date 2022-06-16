import { Button, Grid, Input, Modal, Text, Textarea } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';
import { Icon } from '~/components/base/atoms/Icon';
import { Magazine } from '~/domains/Magazine';

type Props = {
  open: boolean;
  onClose: () => void;
  magazine?: Magazine;
};

export const EditMagazineModal: FC<Props> = ({ open, onClose, magazine }) => {
  const [newMagazine, setNewMagazine] = useState<Magazine>(magazine || Magazine.create({ name: '', description: '', createdUserId: '' }));
  const handleSubmit = useCallback(() => {
    console.log('Submit');
  }, []);

  return (
    <Modal open={open} onClose={onClose} title="TODO" width="600px">
      <Modal.Header>
        <Text h4>{magazine ? 'Edit' : 'Create'} Magazine</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Name"
          value={newMagazine.name}
          onChange={(e) => setNewMagazine(new Magazine({ ...newMagazine, name: e.target.value }))}
          fullWidth
          animated={false}
          placeholder="Preparing for the trip"
          bordered
          required
        />
        <Textarea
          label="Description"
          value={newMagazine.description}
          onChange={(e) => setNewMagazine(new Magazine({ ...newMagazine, description: e.target.value }))}
          placeholder="I summarized the tourist spots in New York"
          minRows={4}
          animated={false}
          maxRows={10}
          bordered
        />
        <Grid css={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            icon={<Icon icon="PENCIL" />}
            color="secondary"
            css={{ fontWeight: '$bold' }}
            disabled={!newMagazine.name.trim()}
          >
            {magazine ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
