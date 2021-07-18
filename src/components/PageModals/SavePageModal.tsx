import { VFC, useState, useEffect } from 'react';
import { Emoji } from 'emoji-mart';
import Loader from 'react-loader-spinner';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { NoPageAlert } from '~/components/Alerts/NoPageAlert';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { OgpPreviewCard } from '~/components/organisms/OgpPreviewCard';
import { Modal } from '~/components/base/molecules/Modal';

import { useDirectoryForSavePage } from '~/stores/modal';
import { usePageListSWR, usePageNotBelongDirectory } from '~/stores/page';
import { useSocketId, useUrlFromClipBoard } from '~/stores/contexts';

import { useLocale } from '~/hooks/useLocale';

export const SavePageModal: VFC = () => {
  const { t } = useLocale();

  const [url, setUrl] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [activePage, setActivePage] = useState(1);

  const { data: directoryForSavePage, mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();
  const { data: socketId } = useSocketId();

  const { mutate: pageListMutate } = usePageListSWR();
  const { data: paginationResult, mutate: mutatePageNotBelongDirectory } = usePageNotBelongDirectory({ activePage, searchKeyWord });
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
      toastSuccess(t.toastr_delete_url);
      pageListMutate();
      closeModal();
    } catch (err) {
      toastError(err);
    }
  };

  const closeModal = async () => {
    mutateUrlFromClipBoard(null);
    setUrl('');
    mutateDirectoryForSavePage(null);
  };

  const updateDirectroyName = async (searchWord: string) => {
    setSearchKeyWord(searchWord);
  };

  const addPageToDirectory = async (pageId: string) => {
    try {
      await restClient.apiPut(`/pages/${pageId}/directories`, {
        directoryId: directoryForSavePage?._id,
      });
      toastSuccess(t.toastr_success_add_directory);
      mutatePageNotBelongDirectory();
      pageListMutate();
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  return (
    <Modal isOpen={directoryForSavePage != null} toggle={closeModal} title={t.save_page_to_directory}>
      <div className="row align-items-center">
        <div className="col-12 col-md-3 text-md-end">
          <span>{t.input_url}</span>
        </div>
        <div className="col-12 col-md-9">
          <form className="input-group my-2" onSubmit={handleSubmit}>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control bg-white" placeholder="...url" autoFocus />
            <button className="btn btn-success" type="submit" disabled={url.trim() === ''}>
              {t.save}
            </button>
          </form>
        </div>
      </div>
      <hr className="mt-4" />
      <p>{t.add_page_already_saved}</p>
      <div className="d-flex gap-1 align-items-center mb-3">
        <Emoji emoji="mag" size={18} />
        <EditableInput onSubmit={updateDirectroyName} value={searchKeyWord} placeholder="Search..." isAllowEmpty />
      </div>
      {paginationResult == null ? (
        <div className="text-center pt-5">
          <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          {paginationResult.docs.map((page) => {
            return (
              <div key={page._id} className="mb-3">
                <OgpPreviewCard page={page} onClickCard={() => addPageToDirectory(page._id)} />
              </div>
            );
          })}
          {paginationResult.docs.length === 0 ? (
            <div className="col-12">
              <NoPageAlert />
            </div>
          ) : (
            <div className="text-center">
              <PaginationWrapper
                pagingLimit={paginationResult.limit}
                totalItemsCount={paginationResult.totalDocs}
                activePage={activePage}
                mutateActivePage={(number) => setActivePage(number)}
              />
            </div>
          )}
        </>
      )}
    </Modal>
  );
};
