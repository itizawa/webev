import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, VFC } from 'react';

import { imagePath } from '~/const/imagePath';
import { restClient } from '~/utils/rest-client';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { toastError, toastSuccess } from '~/utils/toastr';

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const [scrapTitle, setScrapTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmitCreateScrap = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const res = await restClient.apiPost('/scraps', { scrap: { title: scrapTitle, body: '' } });
      const { _id: scrapId } = res.data;
      router.push(`/scrap/${scrapId}/edit`);

      toastSuccess(t.toastr_create_scrap);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.create_scrap}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <Link href="/scrap">
              <a className="btn btn-primary btn-sm text-white">{`< ${t.return_list}`}</a>
            </Link>
          </div>
          <form onSubmit={handleSubmitCreateScrap}>
            <div className="row pt-4">
              <div className="col-12 offset-md-2 col-md-8">
                <h1 className="text-center">{t.create_scrap}</h1>
                <p className="text-center">{t.scrap_description}</p>
                <div className="w-50 mx-auto my-4">
                  <Image src={imagePath.BOOKS} height={958} width={1000} />
                </div>
                <div className="mb-3">
                  <label htmlFor="scrap-title" className="form-label">
                    {t.title}
                  </label>
                  <input
                    type="text"
                    className="form-control bg-white"
                    id="scrap-title"
                    value={scrapTitle}
                    onChange={(e) => setScrapTitle(e.target.value)}
                    placeholder={t.scrap_title_placeholder}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary mt-3" disabled={scrapTitle.trim() === '' || isCreating}>
                    {t.create_scrap}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
