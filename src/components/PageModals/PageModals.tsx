import { FC } from 'react';
import { DeletePageModal } from '~/components/PageModals/DeletePageModal';
import { useIsOpenDeletePageModal } from '~/stores/modal';

export const PageModals: FC = () => {
  useIsOpenDeletePageModal(false);

  return <DeletePageModal />;
};
