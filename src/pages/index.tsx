import { ReactNode } from 'react';
import Image from 'next/image';

import { Button, Grid } from '@nextui-org/react';
import { imagePath } from '~/libs/constants/imagePath';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { useLocale } from '~/hooks/useLocale';

import { PageCountupCard } from '~/components/domain/Page/PageCountupCard';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { restClient } from '~/utils/rest-client';
import { Link } from '~/components/uiParts';

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
        <Link href="/home">
          <Button color="secondary">{t.start_immediately}</Button>
        </Link>
      </Grid>
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
