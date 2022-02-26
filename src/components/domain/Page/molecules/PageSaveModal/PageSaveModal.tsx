import { VFC, useState, useEffect } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { Modal } from '~/components/base/molecules/Modal';

import { useDirectoryForSavePage } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';
import { useSocketId, useUrlFromClipBoard } from '~/stores/contexts';

import { useLocale } from '~/hooks/useLocale';
import { isValidUrl } from '~/utils/isValidUrl';

export const PageSaveModal: VFC = () => {
  const { t } = useLocale();

  const [url, setUrl] = useState('');

  const { data: directoryForSavePage, mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();
  const { data: socketId } = useSocketId();

  const { mutate: pageListMutate } = usePageListSWR();
  const { data: urlFromClipBoard, mutate: mutateUrlFromClipBoard } = useUrlFromClipBoard();

  useEffect(() => {
    if (urlFromClipBoard != null) {
      setUrl(urlFromClipBoard);
    } else {
      setUrl('');
    }
  }, [urlFromClipBoard]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url, socketId, directoryId: directoryForSavePage?._id });
      toastSuccess(t.toastr_save_url);
      pageListMutate();
      closeModal();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  const closeModal = async () => {
    mutateUrlFromClipBoard(null);
    setUrl('');
    mutateDirectoryForSavePage(null);
  };

  return (
    <Modal isOpen={directoryForSavePage != null} toggle={closeModal} title={t.save_page_to_directory}>
      <div className="row align-items-center">
        <div className="col-12 col-md-3 text-md-end">
          <span>{t.input_url}</span>
        </div>
        <div className="col-12 col-md-9">
          <form className="input-group my-2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control bg-white"
              placeholder="...url"
              autoFocus
            />
            <button className="btn btn-success" type="submit" disabled={!isValidUrl(url)}>
              {t.save}
            </button>
          </form>
        </div>
      </div>
      <hr className="mt-4" />
      <p>{t.add_page_already_saved}</p>
    </Modal>
  );
};
