import { FC } from 'react';
import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { StarIcon } from '~/components/icons/StarIcon';

type Props = {
  url: string;
  image: string;
  description: string;
  title: string;
  isFavorite?: boolean;
};

export const OgpCard: FC<Props> = (props: Props) => {
  const { url, image, title, description, isFavorite } = props;

  return (
    <div className={`card border-0 shadow ${styles.card}`}>
      <div className={styles.fixed}>
        <a href={url} target="blank" rel="noopener noreferrer">
          <img src={image} alt={image} className="card-img-top" />
        </a>
      </div>
      <div className="card-body p-2">
        <h5 className="card-title my-1">
          <a className="text-white text-decoration-none" href={url} target="blank" rel="noopener noreferrer">
            {title}
          </a>
        </h5>
        <p className="small mt-2">{description}</p>
        <div className={styles.manager}>
          <StarIcon width={24} height={24} isActive={isFavorite} />
        </div>
      </div>
    </div>
  );
};
