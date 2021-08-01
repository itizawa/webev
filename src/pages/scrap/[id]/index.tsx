import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';

import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';

import { imagePath } from '~/const/imagePath';

import { useLocale } from '~/hooks/useLocale';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { UserIcon } from '~/components/domain/User/atoms/UserIcon';
import { PagePreviewCard } from '~/components/domain/Page/molecules/PagePreviewCard';

import { useScrapById } from '~/stores/scrap';
import { useCurrentUser, useUserById } from '~/stores/user';
import { ScrapCard } from '~/components/domain/Scrap/molecules/ScrapCard';
import { Icon } from '~/components/base/atoms/Icon';

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { id: scrapId } = router.query;

  const { data: scrap, isValidating: isValidatingScrap } = useScrapById({ scrapId: scrapId as string });
  const { data: createdUser } = useUserById({ userId: scrap?.createdUser });
  const { data: currentUser } = useCurrentUser();

  if (isValidatingScrap) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (scrap == null) {
    return (
      <>
        <WebevOgpHead title={`Webev | ${t.data_not_found}`} />
        <div className="p-3">
          <h1 className="m-3 text-center">{t.data_not_found}</h1>
          <div className="w-50 mx-auto">
            <Image src={imagePath.SEARCH} height={958} width={1000} />
          </div>
          <h2 className="text-center">
            <Link href="/">
              <a className="text-white webev-anchor">{t.go_to_top}</a>
            </Link>
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${scrap.title}`} />
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Link href="/scrap">
            <a className="btn btn-primary btn-sm text-white">{`< ${t.return_list}`}</a>
          </Link>
          {scrap.createdUser === currentUser?._id && (
            <Link href={`/scrap/${scrap._id}/edit`}>
              <a className="btn btn-secondary btn-sm text-white">
                <Icon icon="PENCIL" height={16} width={16} color="WHITE" />
                <span className="ms-2">{t.edit_scrap}</span>
              </a>
            </Link>
          )}
        </div>
        <div className="d-flex flex-md-row flex-column flex-md-row-reverse">
          <div className="col-md-4 px-2">
            {createdUser != null && (
              <div className="text-center py-3">
                <Link href={`/user/${createdUser._id}`}>
                  <a className="text-white webev-anchor d-flex align-items-center">
                    <UserIcon image={createdUser.image} size={36} isCircle />
                    <span className="ms-3 text-truncate">{createdUser.name}</span>
                  </a>
                </Link>
              </div>
            )}
            <div>
              <ScrapCard scrap={scrap} />
            </div>
          </div>
          <div className="col-md-8 px-2">
            <h2 className="my-3">Page</h2>
            {scrap.pages.map((page) => {
              return (
                <div key={page._id} className="mb-3">
                  <PagePreviewCard page={page} onClickCard={() => window.open(page.url, '_blank')} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
