import { Button, Grid, Modal, Text } from '@nextui-org/react';
import { FC, useCallback } from 'react';
import { Icon } from '~/components/base/atoms/Icon';
import { Magazine } from '~/domains/Magazine';

type Props = {
  open: boolean;
  onClose: () => void;
  magazine?: Magazine;
};

export const EditMagazineModal: FC<Props> = ({ open, onClose, magazine }) => {
  const handleSubmit = useCallback(() => {
    console.log('Submit');
  }, []);
  return (
    <Modal open={open} onClose={onClose} title="TODO" width="600px">
      <Modal.Header>
        <Text h4>Edit Magazine</Text>
      </Modal.Header>
      <Modal.Body>
        {/* <Text h5 css={{ mb: '$8' }}>
          {page.title}
        </Text> */}
        <Grid css={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSubmit} icon={<Icon icon="PENCIL" />} css={{ fontWeight: '$bold' }}>
            {magazine ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
