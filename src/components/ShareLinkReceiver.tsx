import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useLocale } from '~/hooks/useLocale';

type Props = {};

export const ShareLinkReceiver: VFC<Props> = () => {
  const router = useRouter();
  const { t } = useLocale();

  const [title, setTitle] = useState<string | null>();
  const [url, setUrl] = useState<string | null>();

  useEffect(() => {
    setTitle(router.query.title as string);
    setUrl(router.query.url as string);
  }, [router]);

  const handleCloseButton = () => {
    setTitle(null);
    setUrl(null);
  };

  return (
    <Modal isOpen={title != null && url != null} toggle={handleCloseButton}>
      <ModalHeader className="bg-dark">{t.save_page}</ModalHeader>
      <ModalBody className="bg-dark text-break text-center">
        <h5 className="text-center my-3">{title}</h5>
        <h5 className="">{url}</h5>
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-secondary" onClick={handleCloseButton}>
            {t.cancel}
          </button>
          <button className="btn btn-danger" onClick={handleCloseButton}>
            {t.save}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
