import { useState, VFC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import { useDirectoryListSWR } from '~/stores/directory';

const CHARACTERS = [
  {
    id: 'gambaruzoi',
    name: 'がんばるぞい',
    thumb: '/images/1.png',
  },
  {
    id: 'gyp',
    name: 'ぎょぱー！',
    thumb: '/images/2.png',
  },
  {
    id: 'iine',
    name: 'いいね！',
    thumb: '/images/3.png',
  },
  {
    id: 'shincyoku_doudesuka',
    name: '進捗どうですか',
    thumb: '/images/4.png',
  },
  {
    id: 'shobon',
    name: 'ショボーン',
    thumb: '/images/5.png',
  },
];

export const Diectory: VFC = () => {
  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');
  const { t } = useTranslation();

  const [characters, updateCharacters] = useState(CHARACTERS);

  const handleOnDragEnd = (result: any) => {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  };

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
        {/* Droppableをここに追加 */}
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        className="bg-info text-dark text-decoration-none"
                        key={id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {/* placeholderをここに追加 */}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <StyledDiv className="text-center mx-3">
        <ul className="sidebar-list-group list-group gap-1 py-3">
          {paginationResult?.docs.map((v) => {
            return (
              <Link key={v._id} href={`/directories/${v._id}`}>
                <StyledList className="list-group-item border-0" role="button">
                  <span>{v.name}</span>
                </StyledList>
              </Link>
            );
          })}
        </ul>
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
