import { FC, useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  url: string;
};

export const OgpCard: FC<Props> = (props: Props) => {
  const { url } = props;
  const [image, setImage] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const retrieveOgp = async (): Promise<void> => {
      const res = await axios.get(`/api/ogp?url=${url}`);
      const { image, desc } = res.data;
      console.log(res.data);

      setImage(image);
      setDescription(desc);
    };
    retrieveOgp();
  }, [url]);

  return (
    <div className="card">
      <img src={image} alt={image} />
      <div className="card-body">
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};
