import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { useLocale } from '~/hooks/useLocale';
import { useSocketId } from '~/stores/contexts';
import { usePageListSWR } from '~/stores/page';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

export const ShareLinkReceiverModal: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const { data: socketId } = useSocketId();
  const { mutate: mutatePageList } = usePageListSWR();

  const [title, setTitle] = useState<string | null>();
  const [url, setUrl] = useState<string | null>();

  useEffect(() => {
    if (typeof router.query.title === 'string') {
      setTitle(router.query.title);
    }
    if (typeof router.query.url === 'string') {
      setUrl(router.query.url);
    }
  }, [router]);

  const handleClickCloseButton = () => {
    setTitle(null);
    setUrl(null);
    router.push(router.pathname);
  };

  const handleClickSubmitButton = async () => {
    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      setTitle(null);
      setUrl(null);
      mutatePageList();
      router.push(router.pathname);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal title={t.save_page} isOpen={url != null} toggle={handleClickCloseButton}>
      <div className="text-center">
        <p>{title || 'No title'}</p>
        <p>{url}</p>
      </div>
      <div className="d-flex justify-content-evenly mt-5">
        <button className="btn btn-secondary" onClick={handleClickCloseButton}>
          {t.cancel}
        </button>
        <button className="btn btn-indigo" onClick={handleClickSubmitButton}>
          {t.save}
        </button>
      </div>
    </Modal>
  );
};
