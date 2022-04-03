import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { WebevOgpHead } from '@monorepo/webev-client/src/components/common/WebevOgpHead';

import { imagePath } from '@monorepo/webev-client/src/libs/constants/imagePath';
import { WebevNextPage } from '@monorepo/webev-client/src/libs/interfaces/webevNextPage';

import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';

import { PageCountupCard } from '@monorepo/webev-client/src/components/domain/Page/atoms/PageCountupCard';
import { DefaultLayout } from '@monorepo/webev-client/src/components/common/Layout/DefaultLayout';
import { restClient } from '@monorepo/webev-client/src/utils/rest-client';

type Props = {
  count: number;
};

const Page: WebevNextPage<Props> = ({ count }) => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead />
      <Image src={imagePath.EYE_CATCH_DARK} alt={imagePath.EYE_CATCH_DARK} height={1260} width={2240} />
      <div className="row my-3">
        <div className="col-12 col-md-6 offset-md-3">
          <PageCountupCard count={count} text={t.total_pages} />
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-purple mt-3">{t.start_immediately}</button>
        </Link>
      </div>
    </>
  );
};

export async function getStaticProps() {
  try {
    const { data: count } = await restClient.apiGet('pages/all');

    return {
      props: {
        count,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        count: 0,
      },
      revalidate: 300,
    };
  }
}

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
