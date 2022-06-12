import { Button, Grid, Modal, Text } from '@nextui-org/react';
import { FC, useCallback } from 'react';
import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Icon } from '~/components/base/atoms/Icon';
import { Page } from '~/domains/Page';
import { usePagePagination } from '~/hooks/Page';
import { useLocale } from '~/hooks/useLocale';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

type Props = {
  open: boolean;
  onClose: () => void;
  page: Page;
};

export const DeletePageModal: FC<Props> = ({ open, onClose, page }) => {
  const { t } = useLocale();
  const { mutatePagePagination } = usePagePagination();

  const deletePage = useCallback(async () => {
    try {
      await restClient.apiDelete(`/pages/${page.id}`);
      toastSuccess(t.toastr_delete_url);
      mutatePagePagination();
      onClose();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [mutatePagePagination, onClose, page.id, t.toastr_delete_url]);
  return (
    <Modal open={open} onClose={onClose} title={t.welcome_webev} width="600px">
      <Modal.Header>
        <Text h4 css={{ color: '$red700' }}>
          {t.delete_page}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <FixedImage imageUrl={page.image} />
        <Text h5 css={{ mb: '$8' }}>
          {page.title}
        </Text>
        <Grid css={{ display: 'flex', '@smMax': { flexDirection: 'column' }, gridGap: '$8', justifyContent: 'center' }}>
          <Button color="error" onClick={deletePage} icon={<Icon icon="TRASH" />} css={{ fontWeight: '$bold' }}>
            {t.delete}
          </Button>
          <Button color="default" bordered onClick={onClose} css={{ fontWeight: '$bold' }}>
            {t.cancel}
          </Button>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};
