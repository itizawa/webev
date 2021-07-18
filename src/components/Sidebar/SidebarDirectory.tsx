import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { DragDropContext, Droppable, Draggable, DragUpdate } from 'react-beautiful-dnd';

import { DirectorySidebarListItem } from '~/components/domain/Directory/molecules/DirectorySidebarListItem';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/base/molecules/IconButton';

import { useAllParentDirectories } from '~/stores/directory';
import { Directory } from '~/domains/Directory';
import { useLocale } from '~/hooks/useLocale';

export const SidebarDirectory: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const directoryId = router.query.id;

  const { data: allParentDirectories, mutate: mutateAllParentDirectories, isValidating: isValidatingAllParentDirectories } = useAllParentDirectories();

  const [directories, setDirectories] = useState<Directory[]>([]);
  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const handleOnDragEnd = (result: DragUpdate) => {
    // may not have any destination (drag to nowhere)
    if (result.destination == null) {
      return;
    }
    // Do nothing if in the same place
    if (result.source.index === result.destination.index) {
      return;
    }

    try {
      restClient.apiPut(`/directories/${result.draggableId}/order`, { order: result.destination.index + 1 });
    } catch (err) {
      toastError(err);
    }

    const reorderedItems = directories.splice(result.source.index, 1);
    directories.splice(result.destination.index, 0, ...reorderedItems);

    setDirectories(directories);
  };

  useEffect(() => {
    if (allParentDirectories != null) {
      setDirectories(allParentDirectories);
    }
  }, [allParentDirectories]);

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

  const handleClickDirectory = (directoryId: string) => {
    router.push(`/directory/${directoryId}`);
  };

  if (isValidatingAllParentDirectories) {
    return (
      <div className="text-center">
        <Loader type="Oval" color="#00BFFF" height={64} width={64} />
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="directories">
          {(provided) => (
            <StyledDirectpryDiv className="px-3 overflow-auto" {...provided.droppableProps} ref={provided.innerRef}>
              {directories.map((directory, index) => {
                return (
                  <Draggable key={directory._id} draggableId={directory._id} index={index}>
                    {(provided) => (
                      <div key={directory._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="my-1">
                        <DirectorySidebarListItem directory={directory} onClickDirectory={handleClickDirectory} activeDirectoryId={directoryId as string} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </StyledDirectpryDiv>
          )}
        </Droppable>
      </DragDropContext>
      {directories.length < 10 && (
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

const StyledDirectpryDiv = styled.div`
  max-height: 60vh;
`;
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
