import { ReactNode } from 'react';
import { useApiToken } from '~/stores/user';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { toastSuccess, toastError } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { WebevNextPage } from '~/interfaces/webevNextPage';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { data: apiToken, mutate: mutateApiToken } = useApiToken();

  const handleUpdateApiToken = async () => {
    try {
      await restClient.apiPut('/users/api-token');
      toastSuccess(t.toastr_update_api_token);
      mutateApiToken();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user}${t.settings}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <h1 className="mb-0">
            {t.user}
            {t.settings}
          </h1>
          <div className="row my-3">
            <label className="col-md-2 mb-2">Api Token</label>
            <div className="input-group col-md-10 col-12">
              <input className="form-control" type="text" readOnly value={apiToken} />
              <button className="btn btn-secondary input-group-text" onClick={handleUpdateApiToken}>
                更新
              </button>
            </div>
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
