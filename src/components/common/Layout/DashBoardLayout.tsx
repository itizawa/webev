import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useActivePage, useDirectoryId } from '~/stores/page';
import { useCurrentUser } from '~/stores/user';

import { Navbar } from '~/components/common/Navbar';
import { Sidebar } from '~/components/common/Sidebar';
import { FooterSubnavBar } from '~/components/common/FooterSubnavBar';
import { Footer } from '~/components/common/Parts/Footer';

import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
import { PageAddToDirectoryModal } from '~/components/domain/Page/molecules/PageAddToDirectoryModal';
import { PageDeleteModal } from '~/components/domain/Page/molecules/PageDeleteModal';
import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

import { SocketConnector } from '~/components/domain/Socket/SocketConnector';
import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '~/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '~/components/case/atoms/ScrollTopButton';

import { DIRECTORY_ID_URL } from '~/libs/constants/urls';
import { restClient } from '~/utils/rest-client';
import { toastError } from '~/utils/toastr';
import { Directory } from '~/domains/Directory';
import { useDirectoryPaginationResult } from '~/stores/directory';

export const DashBoardLayout: FC = ({ children }) => {
  const [session] = useSession();
  const router = useRouter();
  const { mutate: mutateActivePage } = useActivePage();
  const { mutate: mutateDirectoryId } = useDirectoryId();

  const { data: currentUser } = useCurrentUser();
  const { data: directoryPaginationResult, mutate: mutateDirectoryPaginationResult } = useDirectoryPaginationResult({ searchKeyWord: '', isRoot: true });

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

  const handleOnDragEnd = ({ active, over }: DragEndEvent) => {
    if (!directoryPaginationResult) {
      return;
    }
    if (!over) {
      return;
    }
    console.log(active);
    console.log(over);
    const destOrder = Number(over.id) + 1;
    const sourceOrder = Number(active.id) + 1;

    if (over.id === active.id) {
      return;
    }

    try {
      restClient.apiPut(`/directories/${directoryPaginationResult.docs[Number(active.id)]._id}/order`, { order: destOrder });
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
  };

  useEffect(() => {
    if (router.pathname !== DIRECTORY_ID_URL) {
      mutateDirectoryId(null);
    }
    mutateActivePage(1);
  }, [mutateActivePage, mutateDirectoryId, router]);

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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
          <div className="d-none d-md-block col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-8 pt-3">{children}</div>
        </DndContext>
        {session && (
          <>
            <DirectoryCreateModal />
            <DirectoryDeleteModal />
            <DirectoryRenameModal />
            <PageDeleteModal />
            <PageAddToDirectoryModal />
            <PageSaveModal />
          </>
        )}
        {session && <SocketConnector />}
        {session && <ShareLinkReceiverModal />}
        {currentUser && <TutorialDetectorModal />}
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
