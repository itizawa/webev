import { FC } from 'react';

import { Page } from '~/domains/Page';

type Props = {
  open: boolean;
  onClose: () => void;
  page: Page;
};

export const DeletePageModal: FC<Props> = () => {
  // const deletePage = async () => {
  //   try {
  //     await restClient.apiDelete(`/pages/${page.id}`);
  //     toastSuccess(t.toastr_delete_url);
  //     mutatePagePagination();
  //     onClose();
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // };
  return null;
  // <Modal isOpen={open} toggle={onClose} title={t.delete_page}>
  //   <FixedImage imageUrl={page.image} />
  //   <h5 className="card-title my-3">{page.title}</h5>
  //   <div className="d-flex justify-content-evenly">
  //     <button className="btn btn-secondary" onClick={onClose}>
  //       {t.cancel}
  //     </button>
  //     <button className="btn btn-danger" onClick={deletePage}>
  //       {t.delete}
  //     </button>
  //   </div>
  // </Modal>
};
