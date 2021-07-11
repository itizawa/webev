import Image from 'next/image';
import { VFC } from 'react';

import { imagePath } from '~/const/imagePath';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | New ${t.create_scrap}`} />
      <LoginRequiredWrapper>
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
              <input type="text" className="form-control bg-white" id="scrap-title" placeholder={t.scrap_title_placeholder} />
            </div>
            <div className="text-center">
              <button className="btn btn-purple btn-lg mt-3">{t.create_scrap}</button>
            </div>
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
