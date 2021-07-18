import { VFC } from 'react';

import { Presenter } from './presenter';
import { useHooks } from './hooks';

export const ScrollTopButton: VFC = () => {
  const viewProps = useHooks();
  return <Presenter {...viewProps} />;
};
