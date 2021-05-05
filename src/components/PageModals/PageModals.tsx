import { VFC } from 'react';

import { AddDirectoryModal } from '~/components/PageModals/AddDirectoryModal';
import { CreateDirectoryModal } from '~/components/PageModals/CreateDirectoryModal';
import { DeletePageModal } from '~/components/PageModals/DeletePageModal';
import { DeleteDirectoryModal } from '~/components/PageModals/DeleteDirectoryModal';

export const PageModals: VFC = () => {
  return (
    <>
      <DeletePageModal />
      <AddDirectoryModal />
      <CreateDirectoryModal />
      <DeleteDirectoryModal />
    </>
  );
};
