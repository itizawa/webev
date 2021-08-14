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
        <CountUp start={0} end={count} duration={3} delay={1} /> Pages
      </h2>
      <p>{text}</p>
    </div>
  );
};
