import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { imagePath } from '~/libs/constants/imagePath';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { useLocale } from '~/hooks/useLocale';

import { PageCountupCard } from '~/components/domain/Page/atoms/PageCountupCard';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';
import { restClient } from '~/utils/rest-client';

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
