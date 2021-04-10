import { useEffect, useState, VFC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable, DragUpdate } from 'react-beautiful-dnd';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { useDirectoryListSWR } from '~/stores/directory';
import { Directory } from '~/interfaces/directory';

export const Diectory: VFC = () => {
  const { t } = useTranslation();

  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();

  const [directories, setDirectories] = useState<Directory[]>([]);

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const handleOnDragEnd = (result: DragUpdate) => {
    // may not have any destination (drag to nowhere)
    if (result.destination == null) {
      return;
    }
    console.log(result);

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
      toastSuccess(t('toastr.save', { target: 'Directory' }));
      setName('');
      mutateDirectoryList();
    } catch (err) {
      toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };

  return (
    <>
      <h5 className="text-center">
        <Icon icon={BootstrapIcon.DIRECTORY} color={BootstrapColor.LIGHT} />
        <Link href="/directory">
          <span className="ms-2" role="button">
            Directory
          </span>
        </Link>
      </h5>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="directories">
          {(provided) => (
            <div className="px-3" {...provided.droppableProps} ref={provided.innerRef}>
              {directories.map((directory, index) => {
                return (
                  <Draggable key={directory._id} draggableId={directory._id} index={index}>
                    {(provided) => (
                      <div key={directory._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Link href={`/directories/${directory._id}`}>
                          <StyledList className="list-group-item border-0">
                            <span>{directory.name}</span>
                          </StyledList>
                        </Link>
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
      <StyledDiv className="text-center mx-3">
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

const StyledList = styled.li`
  padding: 10px;
  color: #eee;
  background-color: inherit;
  border-radius: 3px;

  :hover {
    background-color: rgba(200, 200, 200, 0.2);
    transition: all 300ms linear;
  }
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
