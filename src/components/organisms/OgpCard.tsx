import { FC } from 'react';

type Props = {
  url: string;
  image: string;
  description: string;
  title: string;
};

export const OgpCard: FC<Props> = (props: Props) => {
  const { url, image, title, description } = props;

  return (
    <>
      <a href={url} target="blank" rel="noopener noreferrer">
        <img src={image} alt={image} className="w-100 rounded" />
      </a>
      <h5 className="mt-3">{title}</h5>
      <a className="text-muted" href={url} target="blank" rel="noopener noreferrer">
        {url}
      </a>
      <p className="small mt-2">{description}</p>
    </>
  );
};
