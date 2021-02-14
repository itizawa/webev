import { FC } from 'react';
import { IconButton } from '../icons/IconButton';
import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

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
        <div className={`d-flex ${styles.manager}`}>
          <IconButton width={24} height={24} icon={BootstrapIcon.STAR} isActive={isFavorite} activeColor={BootstrapColor.WARNING} />
          <IconButton width={24} height={24} icon={BootstrapIcon.TRASH} />
        </div>
      </div>
    </div>
  );
};
