import { ReactNode } from 'react';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { Term } from '~/components/domain/Term/molecules/Term';
import { useLocale } from '~/hooks/useLocale';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

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
