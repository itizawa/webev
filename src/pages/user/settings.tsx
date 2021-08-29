import { ReactNode } from 'react';
import Loader from 'react-loader-spinner';
import { useDebouncedCallback } from 'use-debounce';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useApiToken, useCurrentUser } from '~/stores/user';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { toastSuccess, toastError } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';

import { User } from '~/domains/User';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { EditableTextarea } from '~/components/case/molecules/EditableTextarea';
import { UserIcon } from '~/components/domain/User/atoms/UserIcon';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: apiToken, mutate: mutateApiToken, isValidating: isValidatingApiToken } = useApiToken();

  const updateProfile = (newObject: Partial<User>): void => {
    try {
      restClient.apiPut<User>('/users/me', { property: newObject });
    } catch (err) {
      toastError(err);
    }
  };
  const debounceUpdateProfile = useDebouncedCallback(updateProfile, 300);

  if (currentUser == null || isValidatingApiToken) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const handleUpdateApiToken = async () => {
    try {
      const { data: user } = await restClient.apiPut<User>('/users/api-token');
      toastSuccess(t.toastr_update_api_token);
      mutateApiToken(user.apiTokenForExtension, false);
    } catch (err) {
      toastError(err);
    }
  };

  const changeProfile = (newObject: Partial<User>): void => {
    mutateCurrentUser({ ...currentUser, ...newObject }, false);
    debounceUpdateProfile(newObject);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user}${t.settings}`} />
      <LoginRequiredWrapper>
        <div className="row mt-3">
          <div className="col-md-3 col-12 text-center mb-3">
            <UserIcon image={currentUser.image} size={140} isCircle />
          </div>
          <div className="col-md-9 col-12 d-flex flex-column gap-2">
            <EditableInput onChange={(inputValue) => changeProfile({ name: inputValue })} value={currentUser.name} isHeader />
            <EditableTextarea
              value={currentUser.description}
              onChange={(inputValue) => changeProfile({ description: inputValue })}
              placeholder={t.no_description}
            />
          </div>
        </div>
        <div className="row my-3">
          <label className="col-md-2 mb-2">Api Token</label>
          <div className="input-group col-md-10 col-12">
            <CopyToClipboard text={apiToken || ''} onCopy={() => toastSuccess('Api Token をコピーしました')}>
              <input className="form-control" type="text" readOnly value={apiToken || ''} />
            </CopyToClipboard>
            <button className="btn btn-secondary input-group-text" onClick={handleUpdateApiToken}>
              更新
            </button>
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
