import { Button, Checkbox, Grid, Modal, Text } from '@nextui-org/react';
import { FC, useState } from 'react';
import { Emoji } from 'emoji-mart';
import { useLocale } from './useLocale';
import { useMagazinePagination } from '~/stores/Magazine';
import { Input, Loading } from '~/components/uiParts';
import { Magazine } from '~/domains/Magazine';

type Props = {
  open: boolean;
  onClose: () => void;
};

const getFilteredMagazines = (magazines: Magazine[], searchKeyword: string, selected: string[]) => {
  return magazines.filter((magazine) => {
    if (searchKeyword === '') return true;
    console.log(magazine);
    if (magazine.id && selected.includes(magazine.id)) {
      return true;
    }
    return magazine.name.includes(searchKeyword);
  });
};

export const AddMagazineModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useLocale();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const { data: magazinePagination, isLoading: isLoadingMagazinePagination } = useMagazinePagination({
    activePage: 1,
    limit: 100,
    sort: '-updatedAt',
    searchKeyword: '',
  });
  const filteredMagazines = magazinePagination ? getFilteredMagazines(magazinePagination.docs, searchKeyword, selected) : [];

  return (
    <Modal open={open} onClose={onClose} title={t.add_magazine} width="600px" css={{ height: '500px' }}>
      <Modal.Header>
        <Text h4>{t.add_magazine}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          onChange={(e) => setSearchKeyword(e.target.value)}
          contentLeft={<Emoji emoji="mag" size={20} />}
          placeholder="Search..."
          underlined
          clearable
        />
        {isLoadingMagazinePagination ? (
          <Grid css={{ mb: '40px', display: 'flex', justifyContent: 'center' }}>
            <Loading color="secondary" />
          </Grid>
        ) : (
          <Checkbox.Group color="secondary" value={selected} onChange={setSelected} css={{ maxHeight: '400px', overflow: 'scroll' }}>
            {filteredMagazines.map((doc) => {
              return (
                <Checkbox key={doc.id} value={doc.id}>
                  {doc.name}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        )}
        <Grid css={{ mt: 'auto' }}>
          <Button color="secondary" css={{ fontWeight: '$bold', mx: 'auto' }} disabled={isLoadingMagazinePagination}>
            {t.update}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
