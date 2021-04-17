import { VFC } from 'react';

import { AddDirectoryModal } from '~/components/PageModals/AddDirectoryModal';
import { DeletePageModal } from '~/components/PageModals/DeletePageModal';

export const PageModals: VFC = () => {
  return (
    <>
      <DeletePageModal />
      <AddDirectoryModal />
    </>
  );
};
