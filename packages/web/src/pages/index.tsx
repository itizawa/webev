import { ReactNode } from 'react';
import Image from 'next/image';

import { Grid } from '@nextui-org/react';
import { imagePath } from '@webev/web/libs/constants/imagePath';
import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { useLocale } from '@webev/web/hooks/useLocale';

import { PageCountupCard } from '@webev/web/components/domain/Page/PageCountupCard';
import { DefaultLayout } from '@webev/web/components/common/Layout/DefaultLayout';
import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';
import { restClient } from '@webev/web/utils/rest-client';
import { Link } from '@webev/web/components/uiParts';

type Props = {
  count: number;
};

const Page: WebevNextPage<Props> = ({ count }) => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead />
      <Image src={imagePath.EYE_CATCH_DARK} alt={imagePath.EYE_CATCH_DARK} height={1260} width={2240} />
      <Grid css={{ textAlign: 'center', my: '$10' }}>
        <PageCountupCard count={count} text={t.total_pages} />
      </Grid>
      <Grid css={{ textAlign: 'center' }}>
        <Link href="/home" block color="default">
          {t.start_immediately}
        </Link>
      </Grid>
    </>
  );
};

export async function getStaticProps() {
  try {
    const { data } = await restClient.apiGet<{ count: number }>('/pages/all-count');

    return {
      props: {
        count: data.count,
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
