import { VFC, useState } from 'react';

import { Modal } from '~/components/base/molecules/Modal';

import { useDirectoryForImport } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';

export const DirectoryImportModal: VFC = () => {
  const { t } = useLocale();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  const { data: directoryForImport, mutate: mutateDirectoryForImport } = useDirectoryForImport();

  const importPages = async () => {
    console.log(await selectedFile?.text());
    console.log('import');
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files !== null ? e.target.files[0] : null);
    setIsSelected(true);
  };

  const closeImportModal = async () => {
    mutateDirectoryForImport(null);
  };

  return (
    <Modal isOpen={directoryForImport != null} toggle={closeImportModal} title={t.import}>
      <h5 className="mt-3 mb-5 text-center">
        <input type="file" accept="text/html" onChange={changeHandler} />
      </h5>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-secondary" onClick={closeImportModal}>
          {t.cancel}
        </button>
        <button className="btn btn-primary" onClick={importPages} disabled={!isSelected}>
          {t.import}
        </button>
      </div>
    </Modal>
  );
};
