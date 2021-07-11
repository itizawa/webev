import { VFC, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Emoji } from 'emoji-mart';

import styled from 'styled-components';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { EditableInput } from '~/components/Atoms/EditableInput';
import { OgpPreviewCard } from '~/components/organisms/OgpPreviewCard';
import { IconButton } from '~/components/Icons/IconButton';

import { useDirectoryForSavePage } from '~/stores/modal';
import { usePageListSWR, usePageNotBelongDirectory } from '~/stores/page';
import { useSocketId, useUrlFromClipBoard } from '~/stores/contexts';

import { useLocale } from '~/hooks/useLocale';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

export const SavePageModal: VFC = () => {
  const { t } = useLocale();

  const [url, setUrl] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const { data: directoryForSavePage, mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();
  const { data: socketId } = useSocketId();

  const { mutate: pageListMutate } = usePageListSWR();
  const { data: paginationResult, mutate: mutatePageNotBelongDirectory } = usePageNotBelongDirectory(searchKeyWord);
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
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  return (
    <Modal size="lg" isOpen={directoryForSavePage != null} toggle={closeModal}>
      <StyledModalHeader className="bg-dark">
        {t.save_page_to_directory}
        <IconButton
          color={BootstrapColor.LIGHT}
          buttonColor={BootstrapColor.SECONDARY}
          activeColor={BootstrapColor.LIGHT}
          icon={BootstrapIcon.CLOSE}
          onClickButton={closeModal}
        />
      </StyledModalHeader>
      <ModalBody className="bg-dark text-break">
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
        {paginationResult?.docs.map((page) => {
          return (
            <div key={page._id} className="mb-3">
              <OgpPreviewCard page={page} onClickCard={() => addPageToDirectory(page._id)} />
            </div>
          );
        })}
      </ModalBody>
    </Modal>
  );
};

const StyledModalHeader = styled(ModalHeader)`
  .modal-title {
    display: contents;
  }
`;
