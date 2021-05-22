import { VFC } from 'react';

import { AddDirectoryModal } from '~/components/PageModals/AddDirectoryModal';
import { CreateDirectoryModal } from '~/components/PageModals/CreateDirectoryModal';
import { DeletePageModal } from '~/components/PageModals/DeletePageModal';
import { DeleteDirectoryModal } from '~/components/PageModals/DeleteDirectoryModal';
import { RenameDirectoryModal } from '~/components/PageModals/RenameDirectoryModal';
import { SavePageModal } from '~/components/PageModals/SavePageModal';

export const PageModals: VFC = () => {
  return (
    <>
      <DeletePageModal />
      <AddDirectoryModal />
      <CreateDirectoryModal />
      <DeleteDirectoryModal />
      <RenameDirectoryModal />
      <SavePageModal />
    </>
  );
};
