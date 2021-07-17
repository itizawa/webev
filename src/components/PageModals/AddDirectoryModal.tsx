import { useRouter } from 'next/router';
import { VFC, useState } from 'react';
import styled from 'styled-components';

import { IconButton } from '~/components/Icons/IconButton';
import { FixedImage } from '~/components/Atoms/FixedImage';
import { DirectoryItem } from '~/components/Directory/DirectoryItem';
import { Icon } from '~/components/Icons/Icon';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useAllParentDirectories } from '~/stores/directory';
import { usePageForAddDirectory } from '~/stores/modal';
import { useLocale } from '~/hooks/useLocale';
import { usePageListSWR } from '~/stores/page';
import { WebevModal } from '~/components/Atoms/WebevModal';

export const AddDirectoryModal: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const directoryId = router.query.id;

  const { data: pageForAddDirectory, mutate: mutatePageForAddDirectory } = usePageForAddDirectory();

  const { data: allParentDirectories = [], mutate: mutateAllParentDirectories } = useAllParentDirectories();
  const { mutate: mutatePageList } = usePageListSWR();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const addPageToDirectory = async (directoryId: string) => {
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
      mutateAllParentDirectories();
    } catch (err) {
      toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  return (
    <WebevModal isOpen={pageForAddDirectory != null} toggle={() => mutatePageForAddDirectory(null)} title={t.move_directory}>
      <div className="row">
        <div className="col-12 col-md-5">
          <FixedImage imageUrl={pageForAddDirectory?.image} />
          <h5 className="card-title my-1">{pageForAddDirectory?.title || pageForAddDirectory?.url}</h5>
        </div>
        <div className="col-12 col-md-2 text-center">
          <div className="d-none d-md-block mt-5">
            <Icon height={48} width={48} icon="ARROW_RIGHT" color="WHITE" />
          </div>
          <div className="d-md-none d-block my-3">
            <Icon height={48} width={48} icon="ARROW_DOWN" color="WHITE" />
          </div>
        </div>
        <StyledDiv className="col-12 col-md-5">
          {allParentDirectories.map((directory) => {
            return <DirectoryItem key={directory._id} directory={directory} onClickDirectory={addPageToDirectory} activeDirectoryId={directoryId as string} />;
          })}
          <StyledCreateFormDiv className="text-center mx-3 mt-2">
            {isCreatingNewDirectory ? (
              <form className="input-group ps-3" onSubmit={onSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
              </form>
            ) : (
              <IconButton icon="PLUS_DOTTED" color="LIGHT" activeColor="LIGHT" onClickButton={() => setIsCreatingNewDirectory(true)} />
            )}
          </StyledCreateFormDiv>
        </StyledDiv>
      </div>
    </WebevModal>
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
