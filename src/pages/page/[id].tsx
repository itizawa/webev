import { useRouter } from 'next/router';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';

const Index: VFC = () => {
  const { t } = useLocale();

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <WebevOgpHead title={`Webev | ${id}`} />
      <LoginRequiredWrapper>
        <p>{t.private}</p>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
