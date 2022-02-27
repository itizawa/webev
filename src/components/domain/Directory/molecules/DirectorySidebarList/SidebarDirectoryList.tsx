import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { DirectorySidebarListItem } from '~/components/domain/Directory/molecules/DirectorySidebarListItem';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/base/molecules/IconButton';

import { useDirectoryPaginationResult } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';
import { useCreateDirectory } from '~/hooks/Directory/useCreateDirectory';

export const SidebarDirectoryList: VFC = () => {
  const { t } = useLocale();

  const { data: directoryPaginationResult, mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });
  const { createDirectory } = useCreateDirectory();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (directoryPaginationResult) {
      setItems(directoryPaginationResult.docs.map((_, i) => i.toString()));
    }
  }, [directoryPaginationResult]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '') {
      return setIsCreatingNewDirectory(false);
    }

    try {
      toastSuccess(t.toastr_save_directory);
      setName('');
      const result = await createDirectory(name);
      if (directoryPaginationResult) {
        mutateDirectoryPaginationResult(
          {
            ...directoryPaginationResult,
            docs: [...directoryPaginationResult.docs, result],
          },
          false,
        );
      }
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  if (directoryPaginationResult == null) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Oval color="#00bfff" secondaryColor="rgba(0, 191, 255, 0.7)" height={64} width={64} />
      </div>
    );
  }

  return (
    <>
      <div className="px-3">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {directoryPaginationResult.docs.map((directory, index) => {
            return (
              <div key={directory._id} className="my-1">
                <DirectorySidebarListItem directory={directory} index={index} />
              </div>
            );
          })}
        </SortableContext>
      </div>
      {directoryPaginationResult.docs.length < 10 && (
        <StyledDiv className="text-center mx-3 mt-2">
          {isCreatingNewDirectory ? (
            <form className="input-group ps-3" onSubmit={onSubmit}>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control bg-white" placeholder="...name" autoFocus />
            </form>
          ) : (
            <IconButton icon="PLUS_DOTTED" color="LIGHT" activeColor="LIGHT" onClickButton={() => setIsCreatingNewDirectory(true)} />
          )}
        </StyledDiv>
      )}
    </>
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
