import { VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageForAddToDirectory } from '~/stores/modal';
import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

export const PageAddToDirectoryModal: VFC = () => {
  const { t } = useLocale();

  const { data: pageForAddToDirectory, mutate: mutatePageForAddToDirectory } = usePageForAddToDirectory();
  const { mutate: pageListMutate } = usePageListSWR();

  const deletePage = async () => {
    try {
      await restClient.apiDelete(`/pages/${pageForAddToDirectory?._id}`);
      mutatePageForAddToDirectory(null);
      toastSuccess(t.toastr_delete_url);
      pageListMutate();
    } catch (err) {
      toastError(err);
    }
  };

  const closeDeleteModal = async () => {
    mutatePageForAddToDirectory(null);
  };

  return (
    <Modal isOpen={pageForAddToDirectory != null} toggle={closeDeleteModal} title={t.add_page}>
      hoge
    </Modal>
  );
};
