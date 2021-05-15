import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryForSavePage } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';
import { useSocketId } from '~/stores/contexts';

import { useLocale } from '~/hooks/useLocale';

export const SavePageModal: VFC = () => {
  const { t } = useLocale();

  const [url, setUrl] = useState('');

  const { data: directoryForSavePage, mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();
  const { data: socketId } = useSocketId();

  const { mutate: pageListMutate } = usePageListSWR();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url, socketId, directoryId: directoryForSavePage?._id });
      toastSuccess(t.toastr_delete_url);
      pageListMutate();
      mutateDirectoryForSavePage(null);
    } catch (err) {
      toastError(err);
    }
  };

  const closeModal = async () => {
    mutateDirectoryForSavePage(null);
  };

  return (
    <Modal isOpen={directoryForSavePage != null} toggle={closeModal}>
      <ModalHeader className="bg-dark">{t.save_page}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <p className="text-center">{t.save_to_directory(directoryForSavePage?.name as string)}</p>
        <form className="input-group my-2" onSubmit={handleSubmit}>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control bg-white" placeholder="...url" autoFocus />
          <button className="btn btn-success" type="submit" disabled={url.trim() === ''}>
            {t.save}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};
