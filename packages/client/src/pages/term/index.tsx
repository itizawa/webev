import { ReactNode } from 'react';
import { DefaultLayout } from '@monorepo/webev-client/src/components/common/Layout/DefaultLayout';
import { WebevOgpHead } from '@monorepo/webev-client/src/components/common/WebevOgpHead';

import { Term } from '@monorepo/webev-client/src/components/domain/Term/molecules/Term';
import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';
import { WebevNextPage } from '@monorepo/webev-client/src/libs/interfaces/webevNextPage';

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
