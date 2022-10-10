import { ReactNode } from 'react';
import { DefaultLayout } from '@webev/web/components/common/Layout/DefaultLayout';
import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';

import { Term } from '@webev/web/components/domain/Term/molecules/Term';
import { useLocale } from '@webev/web/hooks/useLocale';
import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.term}`} />
      <h1>{t.term}</h1>
      <Term />
    </>
  );
};
const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
