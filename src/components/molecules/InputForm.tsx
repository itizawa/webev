import { VFC, useState, useEffect } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageListSWR } from '~/stores/page';
import { useLocale } from '~/hooks/useLocale';
import { useUrlFromClipBoard, useSocketId } from '~/stores/contexts';

export const InputForm: VFC = () => {
  const { t } = useLocale();

  const { mutate: mutatePageList } = usePageListSWR();
  const { data: socketId } = useSocketId();
  const { mutate: mutateUrlFromClipBoard } = useUrlFromClipBoard();

  const [url, setUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      setUrl('');
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  // read clipboard and set when not used in the past
  const readClipboardText = async () => {
    if (localStorage.getItem('isEnableReadFromClipboard') !== 'true') {
      return;
    }
    const clipboardText = await navigator.clipboard.readText();

    // check url
    if (!clipboardText.match(/^(http|https):\/\//i)) {
      return mutateUrlFromClipBoard(null);
    }
    mutateUrlFromClipBoard(clipboardText);

    const usedClipboardTextsCSV = localStorage.getItem('usedClipboardTexts') || '';
    const usedClipboardTextsArray = usedClipboardTextsCSV.split(',');
    if (usedClipboardTextsArray.includes(clipboardText)) {
      return;
    }
    toastSuccess(t.obtained_from_clipboard);
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
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control ps-3 bg-white" placeholder="...URL" />
      <button className="btn btn-secondary" type="submit" id="input-group" disabled={url.length === 0}>
        {t.save}
      </button>
    </form>
  );
};
