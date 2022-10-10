import { Text } from '@nextui-org/react';
import { FC } from 'react';
import CountUp from 'react-countup';

import { Card } from '@webev/web/components/uiParts';

type Props = {
  count: number;
  text: string;
};

export const PageCountupCard: FC<Props> = ({ count, text }) => {
  return (
    <Card css={{ borderColor: '$warning', padding: '$4' }} variant="bordered">
      <Text h2 css={{ textAlign: 'center' }}>
        <CountUp start={0} end={count} duration={3} delay={1} /> Pages
      </Text>
      <Text css={{ textAlign: 'center', mt: '$4' }}>{text}</Text>
    </Card>
  );
};
