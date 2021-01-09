import { FC, useEffect } from 'react';
import axios from 'axios';

type Props = {
  url: string;
};

export const OgpCard: FC<Props> = (props: Props) => {
  const { url } = props;

  useEffect(() => {
    const retrieveOgp = async (): Promise<void> => {
      const res = await axios.get(`/api/ogp?url=${url}`);
      console.log(res.data);
    };
    retrieveOgp();
  }, [url]);

  return <p>{url}</p>;
};
