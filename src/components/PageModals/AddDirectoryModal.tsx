import { useRouter } from 'next/router';
import { VFC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { FixedImage } from '~/components/Atoms/FixedImage';
import { DirectoryItem } from '~/components/Directory/DirectoryItem';
import { Icon } from '~/components/Icons/Icon';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useDirectoryListSWR } from '~/stores/directory';
import { usePageForAddDirectory } from '~/stores/modal';
import { useLocale } from '~/hooks/useLocale';
import { usePageListSWR } from '~/stores/page';

export const AddDirectoryModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const directoryId = router.query.id;

  const { data: pageForAddDirectory, mutate: mutatePageForAddDirectory } = usePageForAddDirectory();

  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();
  const { mutate: mutatePageList } = usePageListSWR();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const addPageTODirectory = async (directoryId: string) => {
    try {
      await restClient.apiPut(`/pages/${pageForAddDirectory?._id}/directories`, {
        directoryId,
      });
      toastSuccess(t.toastr_success_add_directory);
      mutatePageList();
      mutatePageForAddDirectory(null);
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '') {
      return setIsCreatingNewDirectory(false);
    }

    try {
      await restClient.apiPost('/directories', { name });
      toastSuccess(t.toastr_save_directory);
      setName('');
      mutateDirectoryList();
    } catch (err) {
      toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  return (
    <Modal isOpen={pageForAddDirectory != null} toggle={() => mutatePageForAddDirectory(null)} size="lg">
      <ModalHeader className="bg-dark">{t.move_directory}</ModalHeader>
      <ModalBody className="bg-dark text-break">
        <div className="row">
          <div className="col-12 col-md-5">
            <FixedImage imageUrl={pageForAddDirectory?.image} />
            <h5 className="card-title my-1">{pageForAddDirectory?.title || pageForAddDirectory?.url}</h5>
          </div>
          <div className="col-12 col-md-2 text-center">
            <div className="d-none d-md-block mt-5">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_RIGHT} color={BootstrapColor.WHITE} />
            </div>
            <div className="d-md-none d-block my-3">
              <Icon height={48} width={48} icon={BootstrapIcon.ARROW_DOWN} color={BootstrapColor.WHITE} />
            </div>
          </div>
          <StyledDiv className="col-12 col-md-5">
            {paginationResult?.docs.map((directory) => {
              return <DirectoryItem key={directory._id} directory={directory} onClickDirectory={addPageTODirectory} activeDirectoryId={directoryId as string} />;
            })}
            <StyledCreateFormDiv className="text-center mx-3 mt-2">
              {isCreatingNewDirectory ? (
                <form className="input-group ps-3" onSubmit={onSubmit}>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
                </form>
              ) : (
                <IconButton
                  icon={BootstrapIcon.PLUS_DOTTED}
                  color={BootstrapColor.LIGHT}
                  activeColor={BootstrapColor.LIGHT}
                  onClickButton={() => setIsCreatingNewDirectory(true)}
                />
              )}
            </StyledCreateFormDiv>
          </StyledDiv>
        </div>
        <div className="mt-3 text-center" onClick={() => mutatePageForAddDirectory(null)}>
          <button className="btn btn-secondary w-100">Cancel</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

const StyledDiv = styled.div`
  max-height: 500px;
  overflow: scroll;
`;

const StyledCreateFormDiv = styled.div`
  > .btn {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    :hover {
      background-color: rgba(200, 200, 200, 0.2);
      transition: all 300ms linear;
    }
  }
`;
