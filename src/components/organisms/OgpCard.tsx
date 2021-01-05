import { FC, useEffect } from 'react';
import axios from 'axios';

type Props = {
  url: string;
};

export const OgpCard: FC<Props> = (props: Props) => {
  const { url } = props;

  useEffect(async (): any => {
    const res = await axios.get(`/api/ogp?url=${url}`);
    console.log(res.data);
  }, [url]);

  return <p>{url}</p>;
};
