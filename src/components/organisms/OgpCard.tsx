import { FC, useEffect, useState } from 'react';

import { IconButton } from '../icons/IconButton';
import { restClient } from '~/utils/rest-client';
import styles from '~/styles/components/organisms/OgpCard.module.scss';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { toastError, toastSuccess } from '~/utils/toastr';
import { Page } from '~/interfaces/page';

type Props = {
  page: Page;
};

export const OgpCard: FC<Props> = ({ page }: Props) => {
  const { _id, url, image, title, description } = page;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(page.isFavorite);
  }, [page]);

  const switchFavorite = async () => {
    try {
      const { data: page } = await restClient.apiPut(`/pages/${_id}/favorite`, { isFavorite: !isFavorite });
      toastSuccess('更新しました');
      setIsFavorite(page.isFavorite);
    } catch (err) {
      toastError(err);
    }
  };

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
          <IconButton
            width={24}
            height={24}
            icon={BootstrapIcon.STAR}
            isActive={isFavorite}
            activeColor={BootstrapColor.WARNING}
            onClickButton={switchFavorite}
          />
          <IconButton width={24} height={24} icon={BootstrapIcon.TRASH} />
        </div>
      </div>
    </div>
  );
};
