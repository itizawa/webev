import { useState, useCallback, FC } from 'react';

import { toastSuccess } from '@webev/web/utils/toastr';

import { useLocale } from '@webev/web/hooks/useLocale';
import { usePostPage } from '@webev/web/hooks/Page/usePostPage';
import { Input } from '@webev/web/components/uiParts';

export const PageUrlInputForm: FC = () => {
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
      <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="...https://" fullWidth animated={false} />
    </form>
  );
};
