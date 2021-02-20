import { FC } from 'react';
import { useIsOpenDeletePageModal } from '~/stores/modal';

export const DeletePageModal: FC = () => {
  const { data: isOpenDeleteModal } = useIsOpenDeletePageModal();
  console.log(isOpenDeleteModal);

  return <p>{isOpenDeleteModal}</p>;
};
