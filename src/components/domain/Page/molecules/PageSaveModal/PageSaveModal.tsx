import { VFC, useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PaginationWrapper } from '~/components/common/Parts/PaginationWrapper';
import { PagePreviewCard } from '~/components/domain/Page/molecules/PagePreviewCard';
import { Modal } from '~/components/base/molecules/Modal';

import { useDirectoryForSavePage } from '~/stores/modal';
import { usePageListSWR, usePageNotBelongDirectory } from '~/stores/page';
import { useSocketId, useUrlFromClipBoard } from '~/stores/contexts';

import { useLocale } from '~/hooks/useLocale';
import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { isValidUrl } from '~/utils/isValidUrl';

export const PageSaveModal: VFC = () => {
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
    mutatePageNotBelongDirectory();
  }, [directoryForSavePage, mutatePageNotBelongDirectory]);

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

  const updateDirectoryName = async (searchWord: string) => {
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
      if (error instanceof Error) toastError(error);
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
            <button className="btn btn-success" type="submit" disabled={!isValidUrl(url)}>
              {t.save}
            </button>
          </form>
        </div>
      </div>
      <hr className="mt-4" />
      <p>{t.add_page_already_saved}</p>
      <div className="mb-3">
        <SearchTextBox onChange={updateDirectoryName} />
      </div>
      {paginationResult == null ? (
        <div className="text-center pt-5">
          <Triangle color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          {paginationResult.docs.map((page) => {
            return (
              <div key={page._id} className="mb-3">
                <PagePreviewCard page={page} onClickCard={() => addPageToDirectory(page._id)} />
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
