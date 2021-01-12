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
    <div className="card shadow border-0">
      <img src={image} alt={image} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <a href={url} target="blank" rel="noopener noreferrer">
            {url}
          </a>
        </h6>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};
