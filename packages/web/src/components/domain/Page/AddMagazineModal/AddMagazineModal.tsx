import { Button, Checkbox, Grid, Modal, Text } from '@nextui-org/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocale } from './useLocale';
import { useMagazinePagination } from '@webev/web/stores/Magazine';
import { Input, Loading } from '@webev/web/components/uiParts';
import { Magazine } from '@webev/web/domains/Magazine';
import { Icon } from '@webev/web/components/base/atoms/Icon';
import { toastError } from '@webev/web/utils/toastr';
import { restClient } from '@webev/web/utils/rest-client';
import { usePageMagazineRelationPagination } from '@webev/web/stores/PageMagazineRelation';

type Props = {
  open: boolean;
  onClose: () => void;
  pageId: string;
};

const getFilteredMagazines = (magazines: Magazine[], searchKeyword: string, selected: string[]) => {
  return magazines.filter((magazine) => {
    if (searchKeyword === '') return true;
    if (magazine.id && selected.includes(magazine.id)) {
      return true;
    }
    return magazine.name.includes(searchKeyword);
  });
};

export const AddMagazineModal: FC<Props> = ({ open, onClose, pageId }) => {
  const { t } = useLocale();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [magazineIds, setMagazineIds] = useState<string[]>([]);

  const { data: magazinePagination, isLoading: isLoadingMagazinePagination } = useMagazinePagination({
    activePage: 1,
    limit: 100,
    sort: '-updatedAt',
    searchKeyword: '',
  });
  const { data: pageMagazineRelation } = usePageMagazineRelationPagination({
    pageId,
  });

  useEffect(() => {
    if (pageMagazineRelation) {
      setMagazineIds(pageMagazineRelation.docs.map((doc) => doc.magazineId));
    }
  }, [pageMagazineRelation]);

  const filteredMagazines = magazinePagination ? getFilteredMagazines(magazinePagination.docs, searchKeyword, magazineIds) : [];

  const handleSubmit = useCallback(async () => {
    try {
      await restClient.apiPost('/page-magazine-relations', { pageId, magazineIds });
      onClose();
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  }, [magazineIds, onClose, pageId]);

  return (
    <Modal open={open} onClose={onClose} title={t.add_magazine} width="600px" css={{ height: '500px' }}>
      <Modal.Header>
        <Text h4>{t.add_magazine}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input onChange={(e) => setSearchKeyword(e.target.value)} contentLeft="🔍" placeholder="Search..." underlined clearable />
        {isLoadingMagazinePagination ? (
          <Grid css={{ mb: '40px', display: 'flex', justifyContent: 'center' }}>
            <Loading color="secondary" />
          </Grid>
        ) : (
          <Checkbox.Group
            color="secondary"
            value={magazineIds}
            onChange={setMagazineIds}
            css={{ maxHeight: '400px', overflow: 'scroll', whiteSpace: 'nowrap' }}
          >
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
          <Button
            onClick={handleSubmit}
            color="secondary"
            icon={<Icon icon="JOURNAL_PLUS" />}
            css={{ fontWeight: '$bold', mx: 'auto' }}
            disabled={isLoadingMagazinePagination}
          >
            {t.update}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
