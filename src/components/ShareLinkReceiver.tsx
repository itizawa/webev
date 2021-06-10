import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useLocale } from '~/hooks/useLocale';
import { useSocketId } from '~/stores/contexts';
import { usePageListSWR } from '~/stores/page';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

type Props = {};

export const ShareLinkReceiver: VFC<Props> = () => {
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
  };

  const handleClickSubmitButton = async () => {
    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      setTitle(null);
      setUrl(null);
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal isOpen={title != null && url != null} toggle={handleClickCloseButton}>
      <ModalHeader className="bg-dark">{t.save_page}</ModalHeader>
      <ModalBody className="bg-dark text-break text-center">
        <h5 className="text-center my-3">{title}</h5>
        <h5 className="">{url}</h5>
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-secondary" onClick={handleClickCloseButton}>
            {t.cancel}
          </button>
          <button className="btn btn-indigo" onClick={handleClickSubmitButton}>
            {t.save}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
