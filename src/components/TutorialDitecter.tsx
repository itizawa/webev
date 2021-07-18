import { VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { restClient } from '~/utils/rest-client';

import { useLocale } from '~/hooks/useLocale';

import { useCurrentUser } from '~/stores/user';
import { usePageListSWR } from '~/stores/page';
import { useSocketId } from '~/stores/contexts';
import { toastError, toastSuccess } from '~/utils/toastr';

const HOW_TO_USE_URL = 'https://www.webev.cloud/ja/news/xmaua8n1qes6';

export const TutorialDitecter: VFC = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { t } = useLocale();

  const { mutate: mutatePageList } = usePageListSWR();
  const { data: socketId } = useSocketId();

  const handleOkButton = async () => {
    try {
      await restClient.apiPut('/users/me/isExecutedTutorial');
      await restClient.apiPost('/pages', { url: HOW_TO_USE_URL, socketId });
      toastSuccess(t.toastr_save_url);
      mutatePageList();
      mutateCurrentUser();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Modal isOpen={!currentUser?.isExecutedTutorial} title={t.welcome_webev}>
      <div className="text-center">
        <h3>🎉 {t.welcome_webev} 🎉</h3>
        <p>
          {t.tutorial_desc1}
          <br />
          {t.tutorial_desc2}
        </p>
        <p dangerouslySetInnerHTML={{ __html: t.tutorial_desc3 }} />
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-indigo" onClick={handleOkButton}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};
