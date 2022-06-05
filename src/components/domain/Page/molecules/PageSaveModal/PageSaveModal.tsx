import { VFC } from 'react';

export const PageSaveModal: VFC = () => {
  // const { data: directoryForSavePage, mutate: mutateDirectoryForSavePage } = useDirectoryForSavePage();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();

  //   try {
  //     // await restClient.apiPost('/pages', { url, directoryId: directoryForSavePage?._id });
  //     toastSuccess(t.toastr_save_url);
  //     mutatePagePagination();
  //     closeModal();
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // };

  // const closeModal = async () => {
  //   setUrl('');
  //   // mutateDirectoryForSavePage(null);
  // };

  return null;
  // return (
  //   <Modal isOpen={'directoryForSavePage' != null} toggle={closeModal} title={t.save_page_to_directory}>
  //     <div className="row align-items-center">
  //       <div className="col-12 col-md-3 text-md-end">
  //         <span>{t.input_url}</span>
  //       </div>
  //       <div className="col-12 col-md-9">
  //         <form className="input-group my-2" onSubmit={handleSubmit}>
  //           <input
  //             type="text"
  //             value={url}
  //             onChange={(e) => setUrl(e.target.value)}
  //             className="form-control bg-white"
  //             placeholder="...url"
  //             autoFocus
  //           />
  //           <button className="btn btn-success" type="submit" disabled={!isValidUrl(url)}>
  //             {t.save}
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //     <hr className="mt-4" />
  //     <p>{t.add_page_already_saved}</p>
  //   </Modal>
  // );
};
