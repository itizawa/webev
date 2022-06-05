import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

export const ShareLinkReceiverModal: VFC = () => {
  const router = useRouter();
  const [, setUrl] = useState<string>();

  useEffect(() => {
    if (typeof router.query.url === 'string') {
      setUrl(router.query.url);
    }
  }, [router]);

  // const handleClickCloseButton = useCallback(() => {
  //   setUrl(undefined);
  //   router.push(router.pathname);
  // }, [router]);

  // const handleClickSubmitButton = useCallback(
  //   async (url: string) => {
  //     postPage(url);
  //     toastSuccess(t.toastr_save_url);
  //     setUrl(undefined);
  //     router.push(router.pathname);
  //   },
  //   [postPage, router, t.toastr_save_url],
  // );

  return null;
  // <Modal title={t.save_page} isOpen={!!url} toggle={handleClickCloseButton}>
  //   {isValidating ? (
  //     <StyledDiv className="position-relative w-100">
  //       <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center">
  //         <div className="spinner-border text-info" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </div>
  //       </div>
  //     </StyledDiv>
  //   ) : (
  //     <FixedImage imageUrl={ogp?.image} />
  //   )}
  //   <h5 className="text-center my-3">{ogp?.title || 'No title'}</h5>
  //   <div className="d-flex justify-content-evenly mt-5">
  //     <button className="btn btn-secondary" onClick={handleClickCloseButton}>
  //       {t.cancel}
  //     </button>
  //     <button className="btn btn-indigo" onClick={() => (url ? handleClickSubmitButton(url) : undefined)}>
  //       {t.save}
  //     </button>
  //   </div>
  // </Modal>
};
