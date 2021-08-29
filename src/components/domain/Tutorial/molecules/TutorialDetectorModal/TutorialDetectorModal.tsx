import { useRef, VFC } from 'react';

import Reward from 'react-rewards';
import { Modal } from '~/components/base/molecules/Modal';
import { restClient } from '~/utils/rest-client';

import { useLocale } from '~/hooks/useLocale';

import { User } from '~/domains/User';
import { useCurrentUser } from '~/stores/user';
import { usePageListSWR } from '~/stores/page';
import { useSocketId } from '~/stores/contexts';
import { toastError, toastSuccess } from '~/utils/toastr';

const HOW_TO_USE_URL = 'https://www.webev.cloud/ja/news/xmaua8n1qes6';

export const TutorialDetectorModal: VFC = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { t } = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const okButtonRef = useRef<any>();

  const { mutate: mutatePageList } = usePageListSWR();
  const { data: socketId } = useSocketId();

  const handleOkButton = async () => {
    try {
      const { data } = await restClient.apiPut<User>('/users/me/isExecutedTutorial');
      await restClient.apiPost('/pages', { url: HOW_TO_USE_URL, socketId });
      okButtonRef.current.rewardMe();
      toastSuccess(t.toastr_save_url);
      mutatePageList();
      setTimeout(() => mutateCurrentUser(data, false), 2000);
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
        <div className="d-flex justify-content-center mt-5">
          <Reward ref={okButtonRef} type="confetti" config={{ zIndex: 1000, springAnimation: false, lifetime: 100 }}>
            <button className="btn btn-indigo" onClick={handleOkButton}>
              {t.start_immediately}
            </button>
          </Reward>
        </div>
      </div>
    </Modal>
  );
};
