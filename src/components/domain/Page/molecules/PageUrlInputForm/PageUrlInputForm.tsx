import { VFC, useState } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useLocale } from '~/hooks/useLocale';
import { useSocketId } from '~/stores/contexts';
import { isValidUrl } from '~/utils/isValidUrl';
import { usePagePagination } from '~/hooks/Page';

export const PageUrlInputForm: VFC = () => {
  const { t } = useLocale();

  const { mutatePagePagination } = usePagePagination();
  const { data: socketId } = useSocketId();

  const [url, setUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      setUrl('');
      mutatePagePagination();
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  return (
    <form className="input-group" onSubmit={onSubmit}>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control ps-3 bg-white" placeholder="...URL" />
      <button className="btn btn-secondary" type="submit" id="input-group" disabled={!isValidUrl(url)}>
        {t.save}
      </button>
    </form>
  );
};
