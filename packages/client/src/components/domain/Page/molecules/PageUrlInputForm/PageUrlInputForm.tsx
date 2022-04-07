import { VFC, useState, useCallback } from 'react';

import { toastSuccess } from '@monorepo/client/src/utils/toastr';

import { useLocale } from '@monorepo/client/src/hooks/useLocale';
import { isValidUrl } from '@monorepo/client/src/utils/isValidUrl';
import { usePostPage } from '@monorepo/client/src/hooks/Page/usePostPage';

export const PageUrlInputForm: VFC = () => {
  const { t } = useLocale();
  const [url, setUrl] = useState('');

  const { postPage } = usePostPage();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      postPage(url);
      toastSuccess(t.toastr_save_url);
      setUrl('');
    },
    [postPage, t.toastr_save_url, url],
  );

  return (
    <form className="input-group" onSubmit={onSubmit}>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control ps-3 bg-white" placeholder="...URL" />
      <button className="btn btn-secondary" type="submit" id="input-group" disabled={!isValidUrl(url)}>
        {t.save}
      </button>
    </form>
  );
};
