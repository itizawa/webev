import { VFC, useState, useEffect } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { usePageListSWR } from '~/stores/page';

export const InputForm: VFC = () => {
  const { mutate: mutatePageList } = usePageListSWR();

  const [url, setUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url });
      toastSuccess(`${url} を保存しました!`);
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', async () => {
        const text = await navigator.clipboard.readText();
        console.log(text);
      });
    }
  }, [window]);

  return (
    <form className="input-group" onSubmit={onSubmit}>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control ps-3" placeholder="URL を保存" />
      <button className="btn btn-secondary" type="submit" id="input-group">
        保存する
      </button>
    </form>
  );
};
