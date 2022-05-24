import { Card, Text } from '@nextui-org/react';
import { FC } from 'react';
import CountUp from 'react-countup';

type Props = {
  count: number;
  text: string;
};

export const PageCountupCard: FC<Props> = ({ count, text }) => {
  return (
    <Card bordered css={{ borderColor: '$warning', padding: '$4' }}>
      <Text h2 css={{ textAlign: 'center' }}>
        <CountUp start={0} end={count} duration={3} delay={1} /> Pages
      </Text>
      <Text css={{ textAlign: 'center', mt: '$4' }}>{text}</Text>
    </Card>
  );
};
