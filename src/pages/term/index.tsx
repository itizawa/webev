import { VFC } from 'react';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { Term } from '~/components/Term/Term';

const Index: VFC = () => {
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1>利用規約</h1>
        <Term />
      </div>
    </DefaultLayout>
  );
};

export default Index;
