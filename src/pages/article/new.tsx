import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | New ${t.create_article}`} />
      <LoginRequiredWrapper>
        <div className="row pt-4">
          <div className="col-12 offset-md-2 col-md-8">
            <h1>{t.create_article}</h1>
            <div className="mb-3">
              <label htmlFor="article-title" className="form-label">
                {t.title}
              </label>
              <input type="text" className="form-control bg-white" id="article-title" placeholder={t.article_title_placeholder} />
            </div>
            <div className="mb-3">
              <label htmlFor="article-body" className="form-label">
                {t.description}
              </label>
              <textarea className="form-control bg-white" id="article-body" placeholder={t.article_description_placeholder} rows={3} />
            </div>
            <h2>Page</h2>
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
