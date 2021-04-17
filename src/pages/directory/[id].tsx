import { VFC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { Icon } from '~/components/Icons/Icon';

import { usePageListByDirectoryId } from '~/stores/directory';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pages } = usePageListByDirectoryId(id as string);

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <div className="d-flex align-items-center">{/* <h1>{directory?.name}</h1> */}</div>
          {pages != null &&
            pages.map((page) => (
              <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                <OgpCard page={page} />
              </div>
            ))}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'footer'])),
  },
});

export default Index;
