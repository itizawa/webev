import { useState, VFC } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';

import { DndContext, useDroppable, useDraggable, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

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

  const handleOnDragEnd = ({ over }: DragEndEvent) => {
    if (!directoryPaginationResult) {
      return;
    }
    if (!over) {
      return;
    }
    console.log(over);
    // const destOrder = result.destination.index + 1;
    // const sourceOrder = result.source.index + 1;

    // if (sourceOrder === destOrder) {
    //   return;
    // }

    // try {
    //   restClient.apiPut(`/directories/${result.draggableId}/order`, { order: destOrder });
    // } catch (err) {
    //   if (err instanceof Error) toastError(err);
    // }
    // const { docs } = directoryPaginationResult;
    // const isUp = destOrder > sourceOrder;

    // let targetDocs: Directory[] = [];
    // if (isUp) {
    //   targetDocs = docs.filter((v) => v.order >= sourceOrder && v.order <= destOrder);
    // } else {
    //   targetDocs = docs.filter((v) => v.order <= sourceOrder && v.order >= destOrder);
    // }

    // const newDocs: Directory[] = [
    //   ...docs.filter((v) => !targetDocs.includes(v)),
    //   ...targetDocs.map((v) => {
    //     if (v.order === sourceOrder) {
    //       return { ...v, order: destOrder };
    //     }
    //     return { ...v, order: isUp ? v.order - 1 : v.order + 1 };
    //   }),
    // ];

    // mutateDirectoryPaginationResult(
    //   {
    //     ...directoryPaginationResult,
    //     docs: newDocs.sort((a, b) => a.order - b.order),
    //   },
    //   false,
    // );
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
      if (err instanceof Error) toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  const { setNodeRef: setDropNodeRef } = useDroppable({
    id: 'droppable',
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragNodeRef,
    transform,
  } = useDraggable({
    id: 'draggable',
  });

  const style = {
    transform: CSS.Translate.toString(transform),
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
      <DndContext onDragEnd={handleOnDragEnd}>
        <div className="px-3" ref={setDropNodeRef}>
          {directoryPaginationResult.docs.map((directory) => {
            return (
              <div key={directory._id} ref={setDragNodeRef} style={style} {...listeners} {...attributes} className="my-1">
                <DirectorySidebarListItem directory={directory} />
              </div>
            );
          })}
        </div>
      </DndContext>
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
