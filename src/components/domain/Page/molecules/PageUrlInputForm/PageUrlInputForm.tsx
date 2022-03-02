import { VFC, useState } from 'react';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { useLocale } from '~/hooks/useLocale';
import { isValidUrl } from '~/utils/isValidUrl';
import { usePagePagination } from '~/hooks/Page';
import { generateMockPage } from '~/mock/generateMockPage';
import { Page } from '~/domains/Page';

export const PageUrlInputForm: VFC = () => {
  const { t } = useLocale();

  const { activePage, pagePagination, mutatePagePagination } = usePagePagination();

  const [url, setUrl] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!pagePagination) return;

    try {
      toastSuccess(t.toastr_save_url);
      // TODO: hooks
      mutatePagePagination(restClient.apiPost('/pages', { url }).then(), {
        optimisticData: {
          ...pagePagination,
          docs:
            activePage === 1
              ? [generateMockPage({ title: '...Loading', updatedAt: new Date() }), ...pagePagination.docs]
              : pagePagination.docs,
        },
        populateCache: ({ data: page }: { data: Page }, pagePagination) => {
          return {
            ...pagePagination,
            docs: activePage === 1 ? [page, ...pagePagination.docs] : pagePagination.docs,
          };
        },
        rollbackOnError: true,
        revalidate: false,
      });
      setUrl('');
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
