import { Button, Grid, Loading, Modal, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { FixedImage } from '@webev/web/components/base/atoms/FixedImage';
import { useOgp } from '@webev/web/hooks/Ogp';
import { usePostPage } from '@webev/web/hooks/Page/usePostPage';
import { useLocale } from '@webev/web/hooks/useLocale';
import { toastSuccess } from '@webev/web/utils/toastr';

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
};

export const ShareLinkReceiverModal: FC<Props> = ({ open, onClose, url }) => {
  const { t } = useLocale();
  const router = useRouter();
  const { data: ogp, isLoading: isLoadingOgp } = useOgp(url);
  const { postPage } = usePostPage();

  const handleClickCloseButton = useCallback(() => {
    onClose();
    router.push(router.pathname);
  }, [onClose, router]);

  const handleClickSubmitButton = useCallback(
    async (url: string) => {
      postPage(url);
      toastSuccess(t.toastr_save_url);
      handleClickCloseButton();
    },
    [handleClickCloseButton, postPage, t.toastr_save_url],
  );

  return (
    <Modal open={open} onClose={handleClickCloseButton} title={t.welcome_webev} preventClose width="860px">
      <Modal.Body css={{ textAlign: 'center' }}>
        {isLoadingOgp ? (
          <Grid css={{ display: 'flex', justifyContent: 'center' }}>
            <Loading size="lg" color="secondary" />
          </Grid>
        ) : (
          <Grid css={{ padding: '$10' }}>
            <FixedImage imageUrl={ogp?.image} />
          </Grid>
        )}
        <Text h3 css={{ mb: '$10' }}>
          {ogp?.title || 'No title'}
        </Text>
        <Button color="secondary" onClick={() => (url ? handleClickSubmitButton(url) : undefined)}>
          {t.save}
        </Button>
      </Modal.Body>
    </Modal>
  );
};
