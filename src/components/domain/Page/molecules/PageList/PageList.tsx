import { VFC } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Page } from '~/domains/Page';
import { useOgpCardLayout } from '~/stores/contexts';
import { OgpLayoutType } from '~/libs/interfaces/contexts';

import { NoPageAlert } from '~/components/domain/Page/molecules/NoPageAlert';
import { PaginationWrapper } from '~/components/common/Parts/PaginationWrapper';
import { PageListItem } from '~/components/domain/Page/molecules/PageListItem';
import { PageCard } from '~/components/domain/Page/molecules/PageCard';

import { useActivePage } from '~/stores/page';

type Props = {
  pages: Page[];
  pagingLimit: number;
  totalItemsCount: number;
  isHideArchiveButton?: boolean;
};

export const PageList: VFC<Props> = (props) => {
  const { pages, pagingLimit, totalItemsCount, isHideArchiveButton } = props;
  const { data: ogpCardLayout } = useOgpCardLayout();
  const { data: activePage = 1, mutate: mutateActivePage } = useActivePage();

  const handleMutateActivePage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mutateActivePage(page);
  };

  return (
    <Droppable droppableId="pages">
      {(provided) => (
        <div className="row" ref={provided.innerRef} {...provided.droppableProps}>
          {pages.map((page, index) => {
            if (ogpCardLayout === OgpLayoutType.LIST) {
              return (
                <Draggable key={page._id} draggableId={'p' + page._id} index={index}>
                  {(provided, snapshot) => (
                    <div className="col-12" ref={provided.innerRef} {...provided.draggableProps}>
                      <PageListItem
                        page={page}
                        isHideArchiveButton={isHideArchiveButton}
                        draggableProvidedDragHandleProps={provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              );
            }
            return (
              <Draggable key={page._id} draggableId={'p' + page._id} index={index}>
                {(provided, snapshot) => (
                  <div className="col-xl-4 col-md-6 mb-3" key={page._id} ref={provided.innerRef} {...provided.draggableProps}>
                    <PageCard
                      page={page}
                      isHideArchiveButton={isHideArchiveButton}
                      draggableProvidedDragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {pages.length === 0 ? (
            <div className="col-12">
              <NoPageAlert />
            </div>
          ) : (
            <div className="text-center">
              <PaginationWrapper pagingLimit={pagingLimit} totalItemsCount={totalItemsCount} activePage={activePage} mutateActivePage={handleMutateActivePage} />
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
