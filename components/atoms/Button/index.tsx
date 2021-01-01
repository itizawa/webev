import { FC } from 'react';

type Props = {
  text: string;
};

export const Button: FC<Props> = (props: Props) => {
  return <p>{props.text}</p>;
};
