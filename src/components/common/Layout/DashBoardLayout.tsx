import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCurrentUser } from '~/stores/user';

import { Navbar } from '~/components/common/Navbar';
import { Sidebar } from '~/components/common/Sidebar';
import { FooterSubnavBar } from '~/components/common/FooterSubnavBar';
import { Footer } from '~/components/common/Parts/Footer';

// import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
// import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
// import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '~/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '~/components/case/atoms/ScrollTopButton';

import { usePagePagination } from '~/hooks/Page';
import { restClient } from '~/utils/rest-client';
import { toastError } from '~/utils/toastr';
import { Directory } from '~/domains/Directory';
import { useDirectoryPaginationResult } from '~/stores/directory';
import { useAddPageToDirectory } from '~/hooks/Page/useAddPageToDirectory';
import { PaginationResult } from '~/libs/interfaces/paginationResult';

export const DashBoardLayout: FC = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setActivePage } = usePagePagination();

  const { data: currentUser } = useCurrentUser();
  const { data: directoryPaginationResult, mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({
    searchKeyWord: '',
    isRoot: true,
  });
  const { addPageToDirectory } = useAddPageToDirectory();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleSortDirectories = useCallback(
    (overId: string, activeId: string, directoryPaginationResult: PaginationResult<Directory>) => {
      const destOrder = Number(overId) + 1;
      const sourceOrder = Number(activeId) + 1;

      try {
        restClient.apiPut(`/directories/${directoryPaginationResult.docs[Number(activeId)]._id}/order`, { order: destOrder });
      } catch (err) {
        if (err instanceof Error) toastError(err);
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
    },
    [mutateDirectoryPaginationResult],
  );

  const handleAddPageToDirectory = useCallback(
    (overId: string, activeId: string, directoryPaginationResult: PaginationResult<Directory>) => {
      addPageToDirectory(activeId, directoryPaginationResult.docs[Number(overId)]._id);
    },
    [addPageToDirectory],
  );

  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!directoryPaginationResult) {
        return;
      }
      if (!over) {
        return;
      }
      if (over.id === active.id) {
        return;
      }
      // dragした要素がpageListItemかPageCardだった場合、pageをdirectoryに追加する
      if (!directoryPaginationResult.docs.map((_, index) => index.toString()).includes(active.id)) {
        handleAddPageToDirectory(over.id, active.id, directoryPaginationResult);
        return;
      }

      handleSortDirectories(over.id, active.id, directoryPaginationResult);
    },
    [directoryPaginationResult, handleAddPageToDirectory, handleSortDirectories],
  );

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage, router]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <FooterSubnavBar />
      <StyledDiv className="row mx-auto overflow-hidden">
        <DndContext sensors={sensors} onDragEnd={handleOnDragEnd}>
          <div className="d-none d-md-block col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-8 pt-3">{children}</div>
        </DndContext>
        {session && (
          <>
            {/* <DirectoryCreateModal />
            <DirectoryDeleteModal />
            <DirectoryRenameModal /> */}
            <PageSaveModal />
          </>
        )}
        {session && <ShareLinkReceiverModal />}
        {currentUser && <TutorialDetectorModal />}
        {/* 横幅調整のためにdivでwrapしている */}
        <div>
          <ScrollTopButton />
        </div>
      </StyledDiv>
      <Footer />
    </div>
  );
};

const StyledDiv = styled.div`
  max-width: 1440px;
  /* 画面全体からNavbarとFooterの高さを引く */
  min-height: calc(100vh - 100px - 100px);
`;

const StyledBorder = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
