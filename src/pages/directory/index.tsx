import { VFC, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { IconButton } from '~/components/Icons/IconButton';
import { DirectoryItem } from '~/components/Directory/DirectoryItem';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';

import { useDirectoryListSWR } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { DirectoryListItem } from '~/components/Directory/DirectoryListItem';

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const directoryId = router.query.id;

  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();

  const [isDisplayDirectoryHierarchie, setIsDisplayDirectoryHierarchie] = useState(false);
  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const closeDirectoryHierarchieModal = () => {
    setIsDisplayDirectoryHierarchie(false);
  };

  const handleClickDirectory = (directoryId: string) => {
    setIsDisplayDirectoryHierarchie(false);
    router.push(`/directory/${directoryId}`);
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
    <LoginRequiredWrapper>
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="mb-0">{t.directory}</h1>
          <IconButton
            width={18}
            height={18}
            icon={BootstrapIcon.GEAR}
            color={BootstrapColor.SECONDARY}
            activeColor={BootstrapColor.SECONDARY}
            isActive={isDisplayDirectoryHierarchie}
            onClickButton={() => setIsDisplayDirectoryHierarchie(true)}
            text={t.manage_directory}
          />
        </div>
        {paginationResult != null && (
          <div className="row">
            {paginationResult.docs.map((directory) => (
              <div className="col-xl-4 col-md-6" key={directory._id}>
                <DirectoryListItem directory={directory} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isDisplayDirectoryHierarchie} toggle={closeDirectoryHierarchieModal}>
        <ModalHeader className="bg-dark">{t.directory}</ModalHeader>
        <ModalBody className="bg-dark text-break">
          {paginationResult?.docs.map((directory) => {
            return <DirectoryItem key={directory._id} directory={directory} onClickDirectory={handleClickDirectory} activeDirectoryId={directoryId as string} />;
          })}
          <StyledDiv className="text-center mx-3 mt-2">
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
          </StyledDiv>
          <button className="mt-3 btn btn-secondary w-100" onClick={closeDirectoryHierarchieModal}>
            {t.cancel}
          </button>
        </ModalBody>
      </Modal>
    </LoginRequiredWrapper>
  );
};

const StyledDiv = styled.div`
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

export default Index;
