import { VFC } from 'react';
import CountUp from 'react-countup';

import { useLocale } from '~/hooks/useLocale';

type Props = {
  count: number;
};
export const PageCountupCard: VFC<Props> = ({ count }) => {
  const { t } = useLocale();

  return (
    <div className="card bg-dark border border-warning text-white p-3 text-center">
      <h2>
        <CountUp end={count} delay={1} /> Pages
      </h2>
      <p>{t.total_pages}</p>
    </div>
  );
};
