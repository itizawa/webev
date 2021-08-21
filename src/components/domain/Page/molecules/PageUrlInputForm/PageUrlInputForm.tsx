import { VFC, useState, useEffect } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { usePageListSWR } from '~/stores/page';
import { useLocale } from '~/hooks/useLocale';
import { useUrlFromClipBoard, useSocketId } from '~/stores/contexts';
import { isValidUrl } from '~/utils/isValidUrl';
import { useLocalStorage } from '~/hooks/useLocalStorage';

export const PageUrlInputForm: VFC = () => {
  const { t } = useLocale();

  const { mutate: mutatePageList } = usePageListSWR();
  const { data: socketId } = useSocketId();
  const { data: urlFromClipBoard, mutate: mutateUrlFromClipBoard } = useUrlFromClipBoard();
  const { retrieveValue } = useLocalStorage();

  const [url, setUrl] = useState('');
  const [usedClipboardTexts, setUsedClipboardTexts] = useState<string[]>([]);

  useEffect(() => {
    if (urlFromClipBoard != null) {
      setUrl(urlFromClipBoard);
    } else {
      setUrl('');
    }
  }, [urlFromClipBoard]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      mutateUrlFromClipBoard(null);
      setUrl('');
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  // read clipboard and set when not used in the past
  const readClipboardText = async () => {
    // TODO use vars from DB instead of local storage
    if (retrieveValue('isEnableReadFromClipboard') === 'true') {
      return;
    }
    const clipboardText = await navigator.clipboard.readText();

    // check url
    if (!isValidUrl(clipboardText)) {
      return mutateUrlFromClipBoard(null);
    }

    if (usedClipboardTexts.includes(clipboardText)) {
      return;
    }
    mutateUrlFromClipBoard(clipboardText);
    toastSuccess(t.obtained_from_clipboard);
    setUsedClipboardTexts((prevState) => [...prevState, clipboardText]);
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
      <button className="btn btn-secondary" type="submit" id="input-group" disabled={!isValidUrl(url)}>
        {t.save}
      </button>
    </form>
  );
};
