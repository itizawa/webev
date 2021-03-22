import { VFC, useEffect, useState } from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import { format } from 'date-fns';

import urljoin from 'url-join';
import { IconButton } from '~/components/Icons/IconButton';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import styles from '~/styles/components/organisms/OgpCard.module.scss';

import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { Page } from '~/interfaces/page';

import { usePageListSWR } from '~/stores/page';
import { usePageForDelete, useIsOpenDeletePageModal } from '~/stores/modal';

const MAX_WORD_COUNT = 96;
type Props = {
  page: Page;
};

export const OgpCard: VFC<Props> = ({ page }: Props) => {
  const { mutate: mutatePageList } = usePageListSWR();
  const { _id, url, siteName, image, title, description, createdAt } = page;
  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: mutatePageForDelete } = usePageForDelete();
  const { mutate: mutateIsOpenDeletePageModal } = useIsOpenDeletePageModal();

  useEffect(() => {
    setIsFavorite(page.isFavorite);
  }, [page]);

  const sharePage = async () => {
    if (window != null) {
      const twitterUrl = urljoin('https://twitter.com/intent/tweet', `?url=${encodeURIComponent(url)}`, `&hashtags=${siteName}`);
      window.open(twitterUrl, '_blanck');
    }
  };

  const switchFavorite = async () => {
    try {
      const { data: page } = await restClient.apiPut(`/pages/${_id}/favorite`, { isFavorite: !isFavorite });
      toastSuccess('更新しました');
      setIsFavorite(page.isFavorite);
      mutatePageList();
    } catch (err) {
      toastError(err);
    }
  };

  const openDeleteModal = async () => {
    mutatePageForDelete(page);
    mutateIsOpenDeletePageModal(true);
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
        <p className="small mt-2">{description?.length > MAX_WORD_COUNT ? description?.substr(0, MAX_WORD_COUNT) + '...' : description}</p>
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <small>
              {siteName} <br />
              {format(new Date(createdAt), 'yyyy/MM/dd HH:MM')}
            </small>
          </div>
          <div id={`twitetr-for-${page._id}`}>
            <IconButton
              width={24}
              height={24}
              icon={BootstrapIcon.TWITTER}
              color={BootstrapColor.SECONDARY}
              activeColor={BootstrapColor.SECONDARY}
              onClickButton={sharePage}
            />
          </div>
          <UncontrolledTooltip placement="top" target={`twitetr-for-${page._id}`}>
            Share
          </UncontrolledTooltip>
          <div id={`favorite-for-${page._id}`}>
            <IconButton
              width={24}
              height={24}
              icon={BootstrapIcon.STAR}
              isActive={isFavorite}
              color={BootstrapColor.SECONDARY}
              activeColor={BootstrapColor.WARNING}
              onClickButton={switchFavorite}
            />
          </div>
          <UncontrolledTooltip placement="top" target={`favorite-for-${page._id}`}>
            Favorite
          </UncontrolledTooltip>
          <div id={`trash-for-${page._id}`}>
            <IconButton
              width={24}
              height={24}
              icon={BootstrapIcon.TRASH}
              onClickButton={openDeleteModal}
              color={BootstrapColor.SECONDARY}
              activeColor={BootstrapColor.WARNING}
            />
          </div>
          <UncontrolledTooltip placement="top" target={`trash-for-${page._id}`}>
            Delete
          </UncontrolledTooltip>
        </div>
      </div>
    </div>
  );
};
