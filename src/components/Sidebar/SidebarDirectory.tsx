import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';

import { DragDropContext, Droppable, Draggable, DragUpdate } from 'react-beautiful-dnd';

import { DirectoryItem } from '../Directory/DirectoryItem';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { useDirectoryListSWR } from '~/stores/directory';
import { Directory } from '~/interfaces/directory';
import { useLocale } from '~/hooks/useLocale';

export const SidebarDirectory: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();

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
    if (paginationResult != null) {
      setDirectories(paginationResult.docs);
    }
  }, [paginationResult]);

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
                        <DirectoryItem directory={directory} />
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
      <StyledDiv className="text-center mx-3 mt-2">
        {isCreatingNewDirectory ? (
          <form className="input-group" onSubmit={onSubmit}>
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
