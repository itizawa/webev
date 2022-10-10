import { Button, Grid, Modal, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { FixedImage } from '@webev/web/components/base/atoms/FixedImage';
import { Icon } from '@webev/web/components/base/atoms/Icon';
import { Page } from '@webev/web/domains/Page';
import { usePagePagination } from '@webev/web/hooks/Page';
import { useLocale } from '@webev/web/hooks/useLocale';
import { URLS } from '@webev/web/libs/constants/urls';
import { restClient } from '@webev/web/utils/rest-client';
import { toastError, toastSuccess } from '@webev/web/utils/toastr';

type Props = {
  open: boolean;
  onClose: () => void;
  page: Page;
};

export const DeletePageModal: FC<Props> = ({ open, onClose, page }) => {
  const { t } = useLocale();
  const router = useRouter();
  const { mutatePagePagination } = usePagePagination();

  const deletePage = useCallback(async () => {
    try {
      await restClient.apiDelete(`/pages/${page.id}`);
      toastSuccess(t.toastr_delete_url);
      mutatePagePagination();
      router.push(URLS.HOME_URL);
      onClose();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  }, [mutatePagePagination, onClose, page.id, router, t.toastr_delete_url]);

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
