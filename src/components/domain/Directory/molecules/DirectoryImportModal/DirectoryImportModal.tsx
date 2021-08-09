import { VFC, useState } from 'react';

import { Modal } from '~/components/base/molecules/Modal';

import { useDirectoryForImport } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';

export const DirectoryImportModal: VFC = () => {
  const { t } = useLocale();

  const { data: directoryForImport, mutate: mutateDirectoryForImport } = useDirectoryForImport();

  const importPages = async () => {
    console.log('import');
  };

  const closeImportModal = async () => {
    mutateDirectoryForImport(null);
  };

  return (
    <Modal isOpen={directoryForImport != null} toggle={closeImportModal} title={t.import}>
      <h5 className="mt-3 mb-5 text-center"></h5>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-secondary" onClick={closeImportModal}>
          {t.cancel}
        </button>
        <button className="btn btn-primary" onClick={importPages}>
          {t.import}
        </button>
      </div>
    </Modal>
  );
};
