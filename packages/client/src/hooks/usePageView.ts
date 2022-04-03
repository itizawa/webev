import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { GA_ID, pageview } from '@monorepo/webev-client/src/utils/gtag';

export const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (GA_ID === '') {
      return;
    }

    const handleRouteChange = (path: string, { shallow }: { shallow: string }) => {
      if (!shallow) {
        pageview(path);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
