import { useState, VFC } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { DragDropContext, Droppable, Draggable, DragUpdate } from 'react-beautiful-dnd';

import { DirectorySidebarListItem } from '~/components/domain/Directory/molecules/DirectorySidebarListItem';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/base/molecules/IconButton';

import { useDirectoryPaginationResult } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';
import { useCreateDirectory } from '~/hooks/Directory/useCreateDirectory';
import { Directory } from '~/domains/Directory';

export const SidebarDirectoryList: VFC = () => {
  const { t } = useLocale();

  const { data: directoryPaginationResult, mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });
  const { createDirectory } = useCreateDirectory();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const handleOnDragEnd = (result: DragUpdate) => {
    if (!directoryPaginationResult) {
      return;
    }
    // may not have any destination (drag to nowhere)
    if (!result.destination) {
      return;
    }
    const destOrder = result.destination.index + 1;
    const sourceOrder = result.source.index + 1;

    // Do nothing if in the same place
    if (sourceOrder === destOrder) {
      return;
    }

    try {
      restClient.apiPut(`/directories/${result.draggableId}/order`, { order: destOrder });
    } catch (err) {
      toastError(err);
    }
    const { docs } = directoryPaginationResult;
    const isUp = destOrder > sourceOrder;

    let targetDocs: Directory[] = [];
    if (isUp) {
      targetDocs = docs.filter((v) => v.order >= sourceOrder && v.order <= destOrder);
    } else {
      targetDocs = docs.filter((v) => v.order <= sourceOrder && v.order >= destOrder);
    }

    const newDocs: Directory[] = [
      ...docs.filter((v) => !targetDocs.includes(v)),
      ...targetDocs.map((v) => {
        if (v.order === sourceOrder) {
          return { ...v, order: destOrder };
        }
        return { ...v, order: isUp ? v.order - 1 : v.order + 1 };
      }),
    ];

    mutateDirectoryPaginationResult(
      {
        ...directoryPaginationResult,
        docs: newDocs.sort((a, b) => a.order - b.order),
      },
      false,
    );
  };

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
      toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  if (directoryPaginationResult == null) {
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
            <div className="px-3" {...provided.droppableProps} ref={provided.innerRef}>
              {directoryPaginationResult.docs.map((directory, index) => {
                return (
                  <Draggable key={directory._id} draggableId={directory._id} index={index}>
                    {(provided) => (
                      <div key={directory._id} ref={provided.innerRef} {...provided.draggableProps} className="my-1">
                        <DirectorySidebarListItem directory={directory} draggableProvidedDragHandleProps={provided.dragHandleProps} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
