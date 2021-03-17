import { VFC, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { usePageListSWR } from '~/stores/page';

export const SocketConnector: VFC = () => {
  const [socket] = useState(() => io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'));
  const { mutate: pageListMutate } = usePageListSWR();

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
    });

    return () => {
      socket.close();
    };
  }, []);

  return null;
};
