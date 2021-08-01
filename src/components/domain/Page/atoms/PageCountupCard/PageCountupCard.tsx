import { VFC } from 'react';
import CountUp from 'react-countup';

type Props = {
  count: number;
  text: string;
};

export const PageCountupCard: VFC<Props> = ({ count, text }) => {
  return (
    <div className="card bg-dark border border-warning text-white p-3 text-center">
      <h2>
        <CountUp end={count} delay={1} /> Pages
      </h2>
      <p>{text}</p>
    </div>
  );
};
