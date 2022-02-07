import { VFC, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { usePageListSWR, usePageNotBelongDirectory } from '~/stores/page';
import { useSocketId } from '~/stores/contexts';

export const SocketConnector: VFC = () => {
  const [socket] = useState(() => io(process.env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT || 'http://localhost:8000'));
  const { mutate: pageListMutate } = usePageListSWR();
  const { mutate: mutatePageNotBelongDirectory } = usePageNotBelongDirectory({ activePage: 1, searchKeyWord: '' });

  const { mutate: mutateSocketId } = useSocketId();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected!!');
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected!!');
    });
    socket.on('update-page', () => {
      console.log('Get Updated Data');
      pageListMutate();
      mutatePageNotBelongDirectory();
    });
    socket.on('issue-token', ({ socketId }: { socketId: string }) => {
      mutateSocketId(socketId);
    });

    return () => {
      socket.close();
    };
  }, [mutateSocketId, pageListMutate, mutatePageNotBelongDirectory, socket]);

  return null;
};
