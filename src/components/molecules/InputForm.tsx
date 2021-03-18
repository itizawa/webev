import { VFC, useState, useEffect, useCallback } from 'react';

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
      setUrl('');
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  // read clipboard and set when not used in the past
  const readClipboardText = async () => {
    const clipboardText = await navigator.clipboard.readText();
    const usedClipboardTextsCSV = localStorage.getItem('usedClipboardTexts') || '';
    const usedClipboardTextsArray = usedClipboardTextsCSV.split(',');
    if (usedClipboardTextsArray.includes(clipboardText)) {
      return;
    }
    setUrl(clipboardText);
    usedClipboardTextsArray.unshift(clipboardText);
    let csvForSave = usedClipboardTextsArray.join(',');
    if (usedClipboardTextsArray.length >= 10) {
      csvForSave = usedClipboardTextsArray.slice(0, 9).join(',');
    }
    localStorage.setItem('usedClipboardTexts', csvForSave);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', readClipboardText);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', readClipboardText);
      }
    };
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
